import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Items from './Items';

class App extends Component {
  render() {
    return (
      /*Ingredient Module: User can add an ingredient to a list*/
      <div className="App">
        <Items/>
        
      </div>

    );
  }
}


export default App;
