import { IAnswer, INewAnswer } from "../data/types";
import {
  GET_ANSWERS,
  CREATE_ANSWER,
  UPDATE_ANSWER,
  REMOVE_ANSWER,
  REMOVE_ALL_ANSWERS
} from "./types";

export const getAnswers = () => (
  { type: GET_ANSWERS }
);

export const createAnswer = (payload: INewAnswer) => (
  { type: CREATE_ANSWER, payload }
);

export const updateAnswer = (payload: IAnswer) => (
  { type: UPDATE_ANSWER, payload }
);

export const removeAnswer = (payload: number) => (
  { type: REMOVE_ANSWER, payload }
);

export const removeAllAnswers = () => (
  { type: REMOVE_ALL_ANSWERS }
);

export default {
  getAnswers,
  createAnswer,
  updateAnswer,
  removeAnswer,
  removeAllAnswers
}
