/// Defines redux actions for question data.
import {
  GET_QUESTIONS,
  CREATE_QUESTION,
  UPDATE_QUESTION,
  REMOVE_QUESTION,
} from "./types";
import { IQuestion, INewQuestion } from "../data/types";

export function getQuestions() {
  return { type: GET_QUESTIONS }
};

export function createQuestion(question: INewQuestion) {
  return { type: CREATE_QUESTION, question }
};

export function updateQuestion(question: IQuestion) {
  return { type: UPDATE_QUESTION, question }
};

export function removeQuestion(id: number) {
  return { type: REMOVE_QUESTION, id }
};

export default {
  getQuestions,
  createQuestion,
  updateQuestion,
  removeQuestion
}
