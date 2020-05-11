import { IQuestion, INewQuestion, IAnswer, INewAnswer } from "./types";

export class Question implements IQuestion{
  constructor(question: INewQuestion, id: number) {
    this.gameId = question.gameId;
    this.round = question.round;
    this.number = question.number;
    this.prompt = question.prompt;
    this.answerContains = question.answerContains;
    this.id = id;
  }

  gameId: number;
  id: number;
  round: number;
  number: number;
  prompt: string;
  answerContains: string[];
}

export class Answer implements IAnswer{
  constructor(answer: INewAnswer, id: number) {
    this.gameId = answer.gameId;
    this.id = id;
    this.round = answer.round;
    this.number = answer.number;
    this.answer = answer.answer;
    this.teamName = answer.teamName;
  }

  gameId: number;
  id: number;
  round: number;
  number: number;
  answer: string;
  teamName: string;
}

export default {
  Question,
  Answer
};