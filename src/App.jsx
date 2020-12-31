import React, { Component } from 'react'
import { HashRouter as Router } from 'react-router-dom';

import { Loop } from './cmps/Loop'
import { Recorder } from './cmps/Recorder'



export class App extends Component {
  render() {
    return (
      <div>
        <Loop />
        <Recorder />
      </div>
    )
  }
}






