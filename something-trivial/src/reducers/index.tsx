import questions from '../data/questions'
import {
  GET_QUESTIONS,
  CREATE_QUESTION,
  UPDATE_QUESTION,
  REMOVE_QUESTION
} from "../actions/types";
import { State, Question } from '../data/types';

const initialState: State = {
  questions: questions
};

function rootReducer(state = initialState, action: any): State {
  switch (action.type) {
    case CREATE_QUESTION:
      return add(state, action.question)
    case REMOVE_QUESTION:
      return remove(state, action.id);
    case UPDATE_QUESTION:
      return update(state, action.question)
    case GET_QUESTIONS:
      return state;
    default:
      return state;
  }
};

const remove = (state: State, id: number): State => (
  Object.assign({},
    state,
    { questions: state.questions.filter(question => question.id !== id) }
  )
);

const add = (state: State, question: Question): State => {
  question.id = nextIndex(state);
  return Object.assign({},
    state,
    { questions: state.questions.concat(question) }
  )
};

const update = (state: State, question: Question): State => (
  add(remove(state, question.id), question)
);

const nextIndex = (state: State): number => {
  let i = 1;
  state.questions.forEach(question => {
    i = i > question.id ? i : question.id;
  });
  return i + 1;
}

export default rootReducer;
