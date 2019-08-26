import React, { Component } from 'react'
import { GithubPicker } from 'react-color';
import Axios from 'axios';

import Room from './room';

// fuser -k PORT/tcp

class Canvas extends Component {
  constructor (props) {
    super(props);

    this.state = {
      canvas_width: 500,
      canvas_height: 300,
      pixel_size: 5,
      brush_size: 5,
      paint: false,
      color: '#000',
      one: undefined,
      buffer: [],
      room: 'home'
    }

    this.room = React.createRef()

    window.onresize = () => this.resize();
    this.resize = this.resize.bind(this);
    this.mouse_down = this.mouse_down.bind(this);
    this.mouse_up = this.mouse_up.bind(this);
    this.mouse_move = this.mouse_move.bind(this);
    this.mouse_leave = this.mouse_leave.bind(this);
    this.clear_canvas = this.clear_canvas.bind(this);
    this.paint = this.paint.bind(this);
    this.color = this.color.bind(this);
    this.undo = this.undo.bind(this);
    this.change_room = this.change_room.bind(this);
  }

  change_room () {
    const room = this.room.current.value;
    this.setState({ room }, () => {  
      socket.emit('change room', room);
    })
  }


  // todo: fix paint engine to not make dots when painting quickly
  // add reddis and web sockets... rooms and stuff...

  color ({ hex }) {
    this.setState({ color: hex });
  }

  undo () {
    console.log('%cUNDO', 'color: orange;');
    this.clear_canvas();
    this.draw_canvas(this.props.get_canvas());
  }

  save_canvas () {
    const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    this.props.set_canvas(image);
  }

  clear_canvas () {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, this.state.canvas_width, this.state.canvas_height);
  }

  draw_canvas (image_url) {
    console.log('%cDRAW', 'color: orange');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image;
    img.onload = () => {
      ctx.drawImage(img,0,0);
    };
    img.src = image_url;
  }

  mouse_leave () {
    console.log('%cLEAVE', 'color: lightpink');
    this.setState({ paint: false });
  }

  mouse_down (event) {
    console.log('%c DOWN', 'color: lightgreen');
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left; 
    const y = event.clientY - rect.top;
    this.setState({ paint: true, one: [x, y] });
  }

  mouse_up (event) {
    console.log('%c UP', 'color: lightblue');
    this.setState({ paint: false });
    this.save_canvas();
  }

  mouse_move (event) {
    if(this.state.paint) {
      const rect = event.target.getBoundingClientRect();
      const x2 = event.clientX - rect.left; 
      const y2 = event.clientY - rect.top;
      this.paint(this.state.one[0], this.state.one[1], x2, y2);
      this.setState({ one: [x2, y2] });
    }
  }

  resize () {
    const w = window,
          d = document,
          e = d.documentElement,
          g = d.getElementsByTagName('body')[0],
    canvas_width = w.innerWidth || e.clientWidth || g.clientWidth,
    canvas_height = w.innerHeight|| e.clientHeight|| g.clientHeight;

    this.setState({ canvas_width, canvas_height }, _=> this.draw_canvas(this.props.canvas_data));
  }

  paint (x1, y1, x2, y2) {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.lineWidth= this.state.brush_size;
    ctx.strokeStyle = this.state.color;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  componentDidMount () {
    this.resize();
  }

  render () {
    return (
      <div id="canvas-wrapper">
        <div className="canvas-element-wrapper">
          <canvas 
            id="canvas"
            width={String(this.state.canvas_width - 25)} 
            height={String(this.state.canvas_height * 0.85)}
            onMouseDown={this.mouse_down}
            onMouseUp={this.mouse_up}
            onMouseMove={this.mouse_move}
            onMouseLeave={this.mouse_leave}
          ></canvas>
        </div>
        <div className="canvas-options-wrapper">
          <GithubPicker onChangeComplete={this.color}/>
          <button className="undo-btn" onClick={this.undo}>undo</button>
          <Room change_room={this.change_room} ref={this.room}/>
        </div>
      </div>
    )
  }
}

export default Canvas;