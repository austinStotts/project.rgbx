import React, { Component } from 'react';

import Canvas from './canvas';

class App extends Component {
  constructor() {
    super();

    this.state = {
      canvas_data: undefined,
    }

    this.canvas_buffer = [];

    this.set_canvas = this.set_canvas.bind(this);
    this.get_canvas = this.get_canvas.bind(this);
    this.buffer_pop = this.buffer_pop.bind(this);
    this.buffer_push = this.buffer_push.bind(this);
    this.buffer_shift = this.buffer_shift.bind(this);
  }

  set_canvas (canvas_data) {
    this.setState({ canvas_data });
    this.buffer_push(canvas_data);
  }

  get_canvas () {
    return this.buffer_pop();
  }

  buffer_pop () {
    return this.canvas_buffer.pop();
  }

  buffer_push (item) {
    this.canvas_buffer.push(item)
    if(this.canvas_buffer.length > 50) {
      return this.buffer_shift();
    }
  }

  buffer_shift () {
    return this.canvas_buffer.shift();
  }

  render () {
    return (
      <div>
        <Canvas canvas_data={this.state.canvas_data} set_canvas={this.set_canvas} get_canvas={this.get_canvas}/>
        <p className="name-label">created by: austin</p>
      </div>

    )
  }
}

export default App;
