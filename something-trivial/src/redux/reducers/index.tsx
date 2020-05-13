import { IState } from '../data/types';
import questionReducer from './questionReducer';
import answerReducer from './anwerReducer';

type Action = {
  type: string,
  payload?: any
};

const initialState: IState = {
  questions: [],
  answers: []
};

const rootReducer = (state: IState = initialState, action: Action) => (
  {
    questions: questionReducer(state.questions, action),
    answers: answerReducer(state.answers, action)
  }
);

export default rootReducer;
