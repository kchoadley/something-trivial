import { IState } from '../data/types';
import questions from '../data/questions'
import questionReducer from './questionReducer';
import answerReducer from './anwerReducer';
import answers from '../data/answers';

type Action = {
  type: string,
  payload?: any
};

const initialState: IState = {
  questions: questions,
  answers: answers
};

const rootReducer = (state: IState = initialState, action: Action) => (
  {
    questions: questionReducer(state.questions, action),
    answers: answerReducer(state.answers, action)
  }
);

export default rootReducer;
