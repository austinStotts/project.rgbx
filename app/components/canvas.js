import React, { Component } from 'react'
import { GithubPicker } from 'react-color';

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
      buffer: []
    }


    window.onresize = () => this.resize();
    this.resize = this.resize.bind(this);
    this.mouse_down = this.mouse_down.bind(this);
    this.mouse_up = this.mouse_up.bind(this);
    this.mouse_move = this.mouse_move.bind(this);
    this.mouse_leave = this.mouse_leave.bind(this);
    this.paint = this.paint.bind(this);
    this.color = this.color.bind(this);
    this.undo = this.undo.bind(this);
  }

  // todo: fix paint engine to not make dots when painting quickly
  // add reddis and web sockets... rooms and stuff...

  color ({ hex }) {
    this.setState({ color: hex });
  }

  undo () {
    console.log('%cUNDO', 'color: orange;');
    let new_buffer = this.state.buffer;
    let image = new_buffer.pop();
    this.draw_canvas(image);
    this.setState({ buffer: new_buffer });
  }

  save_canvas () {
    const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    if(this.state.buffer.length < 50) {
      this.setState({ buffer: [this.state.buffer, image] });
    } else {
      new_buffer = this.state.buffer;
      new_buffer.shift();
      this.setState({ buffer: [new_buffer, image] });
    }
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

    this.setState({ canvas_width, canvas_height }, _=> this.draw_canvas(this.state.buffer.pop()));
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
            height={String(this.state.canvas_height * 0.9)}
            onMouseDown={this.mouse_down}
            onMouseUp={this.mouse_up}
            onMouseMove={this.mouse_move}
            onMouseLeave={this.mouse_leave}
          ></canvas>
        </div>
        <div className="canvas-options-wrapper">
          <GithubPicker onChangeComplete={this.color}/>
          <button onClick={this.undo}>undo</button>
        </div>
      </div>
    )
  }
}

export default Canvas;