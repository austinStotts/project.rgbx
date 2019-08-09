import React, { Component } from 'react';

class Canvas extends Component {
  constructor (props) {
    super(props);

    this.state = {
      canvas_width: 500,
      canvas_height: 300,
      pixel_size: 5,
      paint: false,
      color: '#000',
    }

    window.onresize = () => this.resize();
    this.resize = this.resize.bind(this);
    this.mouse_down = this.mouse_down.bind(this);
    this.mouse_up = this.mouse_up.bind(this);
    this.mouse_move = this.mouse_move.bind(this);
    this.mouse_leave = this.mouse_leave.bind(this);
  }

  mouse_leave () {
    console.log('%cLEAVE', 'color: lightpink');
    this.setState({ paint: false });
  }

  mouse_down (event) {
    console.log('%c DOWN', 'color: lightgreen');
    this.setState({ paint: true });
  }

  mouse_up (event) {
    console.log('%c UP', 'color: lightblue');
    this.setState({ paint: false });
  }

  mouse_move (event) {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left; 
    const y = event.clientY - rect.top;
    if(this.state.paint) {
      this.paint(x, y);        
    }
  }

  resize () {
    const w = window,
          d = document,
          e = d.documentElement,
          g = d.getElementsByTagName('body')[0],
    canvas_width = w.innerWidth || e.clientWidth || g.clientWidth,
    canvas_height = w.innerHeight|| e.clientHeight|| g.clientHeight;

    this.setState({ canvas_width, canvas_height });
  }

  paint (x, y) {
    // paint pixels on the canvas 
    // when user clicks:
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = this.state.color;
    ctx.fillRect(x, y, this.state.pixel_size, this.state.pixel_size);
  }

  componentDidMount () {
    this.resize();
  }

  render () {
    return (
      <div id="canvas-wrapper">
        <canvas 
          id="canvas" 
          width={String(this.state.canvas_width * 0.9)} 
          height={String(this.state.canvas_height * 0.9)}
          onMouseDown={this.mouse_down}
          onMouseUp={this.mouse_up}
          onMouseMove={this.mouse_move}
          onMouseLeave={this.mouse_leave}
        ></canvas>
      </div>
    )
  }
}

export default Canvas;