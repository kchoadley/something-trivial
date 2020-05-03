import './App.css';
import questions from './data/questions'; import './App.css';
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import TrivialNavBar from './components/navbar';
import TrivialFooter from './components/footer';
import TrivialController from './components/controller';

class App extends Component {
  componentDidMount() {
    sessionStorage.setItem('questions', JSON.stringify(questions));
  }

  render() {

    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className="App">
          <TrivialNavBar />
          <TrivialController />
          <TrivialFooter />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
