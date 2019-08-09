import React, { Component } from 'react';

class Canvas extends Component {
  constructor (props) {
    super(props);

    this.state = {
      canvas_width: 500,
      canvas_height: 300,
    }

    window.onresize = () => this.resize();
    this.resize = this.resize.bind(this);
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
        ></canvas>
      </div>
    )
  }
}

export default Canvas;