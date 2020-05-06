import questions from '../data/questions'
import {
  GET_QUESTIONS,
  CREATE_QUESTION,
  UPDATE_QUESTION,
  REMOVE_QUESTION
} from "../actions/types";
import { IState, IQuestion, INewQuestion } from '../data/types';
import Question from '../data/classes';

const initialState: IState = {
  questions: questions
};

function rootReducer(state = initialState, action: any): IState {
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

const remove = (state: IState, id: number): IState => (
  Object.assign({},
    state,
    { questions: state.questions.filter(question => question.id !== id) }
  )
);

const add = (state: IState, newQuestion: INewQuestion): IState => {
  let question = new Question(newQuestion, generateId(state));
  
  return Object.assign({},
    state,
    { questions: state.questions.concat(question) }
  )
};

const update = (state: IState, question: IQuestion): IState => (
  add(remove(state, question.id), question)
);

const generateId = (state: IState): number => {
  let i = 1;
  state.questions.forEach(question => {
    i = i > question.id ? i : question.id;
  });
  return i + 1;
}

export default rootReducer;
