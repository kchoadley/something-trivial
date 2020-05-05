import questions from '../data/questions'
import {
  GET_QUESTIONS,
  CREATE_QUESTION,
  UPDATE_QUESTION,
  REMOVE_QUESTION,
  GET_QUESTION_IDS
} from "../actions/types";

const initialState = {
  questions: questions
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_QUESTION:
      return Object.assign({}, state, {
        articles: state.questions.concat(action.payload)
      });
    case GET_QUESTIONS:
      return state;
    default:
      return state;
  }
};

export default rootReducer;