import React, { Component } from 'react';
import './App.css';
import Mixologist from './Mixologist';

class App extends Component {
  //Load out the mixologist application
  render() {
    return (
      <div className="App">
        <Mixologist/>  
      </div>
    );
  }
}
export default App;
