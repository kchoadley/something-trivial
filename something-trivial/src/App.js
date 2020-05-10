import './App.css';
import React, { Component } from 'react';
import TrivialNavBar from './components/TrivialNavBar';
import TrivialFooter from './components/TrivialFooter';
import TrivialController from './components/TrivialController';

class App extends Component {
  render() {
    return (
        <div className="App">
          <TrivialNavBar />
          <TrivialController />
          <TrivialFooter />
        </div>
    );
  }
}

export default App;
