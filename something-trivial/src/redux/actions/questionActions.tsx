import { IQuestion, INewQuestion } from "../data/types";
import {
  GET_QUESTIONS,
  CREATE_QUESTION,
  UPDATE_QUESTION,
  REMOVE_QUESTION,
  REMOVE_ALL_QUESTIONS,
} from "./types";

export const getQuestions = () => (
  { type: GET_QUESTIONS }
);

export const createQuestion = (payload: INewQuestion) => (
  { type: CREATE_QUESTION, payload }
);

export const updateQuestion = (payload: IQuestion) => (
  { type: UPDATE_QUESTION, payload }
);

export const removeQuestion = (payload: number) => (
  { type: REMOVE_QUESTION, payload }
);

export const removeAllQuestions = () => (
  { type: REMOVE_ALL_QUESTIONS }
);

export default {
  getQuestions,
  createQuestion,
  updateQuestion,
  removeQuestion,
  removeAllQuestions
}
