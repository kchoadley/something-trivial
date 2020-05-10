import { INewAnswer, IAnswer } from "../data/types";
import { Answer } from "../data/classes";
import {
  GET_ANSWERS,
  CREATE_ANSWER,
  UPDATE_ANSWER,
  REMOVE_ANSWER,
  FETCH_ANSWERS
} from "../actions/types";

type Action = {
  type: string,
  payload?: any
};

const answerReducer = (answers: IAnswer[], action: Action): IAnswer[] => {
  switch (action.type) {
    case CREATE_ANSWER:
      return add(answers, action.payload)
    case REMOVE_ANSWER:
      return remove(answers, action.payload);
    case UPDATE_ANSWER:
      return update(answers, action.payload)
    case FETCH_ANSWERS:
      return fetch(answers, action.payload)
    case GET_ANSWERS:
      return answers;
    default:
      return answers;
  }
};

const add = (answers: IAnswer[], newAnswer?: INewAnswer): IAnswer[] => (
  (newAnswer === undefined) ?
    (answers) :
    ([...answers, new Answer(newAnswer, generateId(answers))])
);

const remove = (answers: IAnswer[], id?: number): IAnswer[] => (
  (id === undefined) ?
    (answers) :
    (answers.filter(answer => answer.id !== id))
);

const update = (answers: IAnswer[], answer?: IAnswer): IAnswer[] => (
  (answer === undefined) ?
    (answers) :
    (add(remove(answers, answer.id), answer))
);

const fetch = (answers: IAnswer[], newAnswers?: IAnswer[]): IAnswer[] => (
  (newAnswers === undefined) ?
    (answers) :
    ([...answers, ...newAnswers])
);

const generateId = (answers: IAnswer[], index?: number): number => (
  (index === undefined) ? (generateId(answers, 0)) : (
    (answers.length < 1) ? (index) : (
      generateId(remove(answers, answers[0].id),
        (index > answers[0].id) ? (index) : (answers[0].id + 1))))
);

export default answerReducer;
