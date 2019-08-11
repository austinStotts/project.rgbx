import React, { Component } from 'react';

import Canvas from './canvas';

class App extends Component {
  constructor() {
    super();

    this.state = {
      canvas_data: undefined,
    }

    this.set_canvas = this.set_canvas.bind(this);
  }

  set_canvas (canvas_data) {
    this.setState({ canvas_data });
  }

  render () {
    return (
      <div>
        <Canvas canvas_data={this.state.canvas_data} set_canvas={this.set_canvas}/>
        <p className="name-label">created by: austin</p>
      </div>

    )
  }
}

export default App;
