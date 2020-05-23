import { IQuestion, INewQuestion } from '../data/types';
import { Question } from '../data/classes';
import {
  GET_QUESTIONS,
  CREATE_QUESTION,
  UPDATE_QUESTION,
  REMOVE_QUESTION,
  FETCH_QUESTIONS
} from "../actions/types";

type Action = {
  type: string,
  payload?: any
};

const questionReducer = (questions: IQuestion[], action: Action): IQuestion[] => {
  switch (action.type) {
    case CREATE_QUESTION:
      return add(questions, action.payload)
    case REMOVE_QUESTION:
      return remove(questions, action.payload);
    case UPDATE_QUESTION:
      return update(questions, action.payload)
    case FETCH_QUESTIONS:
      return fetch(questions, action.payload) // questions is a stub to use until we have REST api to fetch data from.
    case GET_QUESTIONS:
      return questions;
    default:
      return questions;
  }
};

const add = (questions: IQuestion[], newQuestion?: INewQuestion): IQuestion[] => {
  if (newQuestion === undefined) {
    return questions;
  }

  let id = findQuestion(questions, newQuestion);
  if (id !== undefined) {
    return update(questions, new Question(newQuestion, id));
  }

  return [...questions, new Question(newQuestion, generateId(questions))];
};

const remove = (questions: IQuestion[], id?: number): IQuestion[] => (
  (id === undefined) ?
    (questions) :
    (questions.filter(question => question.id !== id))
);

const update = (questions: IQuestion[], question?: IQuestion): IQuestion[] => (
  (question === undefined) ?
    (questions) :
    (add(remove(questions, question.id), question))
);

const fetch = (questions: IQuestion[], newQuestions?: IQuestion[]): IQuestion[] => (
  (newQuestions === undefined) ?
    (questions) :
    ([...questions, ...newQuestions])
);

const generateId = (questions: IQuestion[], index?: number): number => (
  (index === undefined) ? (generateId(questions, 0)) : (
    (questions.length < 1) ? (index) : (
      generateId(remove(questions, questions[0].id),
        (index > questions[0].id) ? (index) : (questions[0].id + 1))))
);

const findQuestion = (questions: IQuestion[], question: INewQuestion): number | undefined => {
  let match = questions.filter(q =>
    q.gameId === question.gameId &&
    q.round === question.round &&
    q.number === question.number);

  if (match.length > 0) {
    return match[0].id
  }

  return undefined;
};

export default questionReducer;
