import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import questionActions from './actions/questionActions'
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

window.store = store;
window.getQuestions = questionActions.getQuestions;
window.createQuestion = questionActions.createQuestion;
window.updateQuestion = questionActions.updateQuestion;
window.removeQuestion = questionActions.removeQuestion;

// Use these in the browser console for testing creating and removing a question
// store.dispatch( createQuestion( { id: 3, round: 1, number: 4, prompt: 'How deep is the ocean?', answerContains: ['20,000 leagues'] } ) )
// store.dispatch( updateQuestion( { id: 3, round: 1, number: 4, prompt: 'So What?', answerContains: ['Miles Davis'] } ) )
// store.dispatch( removeQuestion( 3 ) )
