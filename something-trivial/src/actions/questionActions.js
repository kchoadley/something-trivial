/// Defines redux actions for question data.
import {
  GET_QUESTIONS,
  CREATE_QUESTION,
  UPDATE_QUESTION,
  REMOVE_QUESTION,
  GET_QUESTION_IDS
} from "./types";

export function createQuestion(question) {
  return { type: CREATE_QUESTION, question }
};