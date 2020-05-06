import { IQuestion, INewQuestion } from "./types";

class Question implements IQuestion{
  constructor(question: INewQuestion, id: number) {
    this.round = question.round;
    this.number = question.number;
    this.prompt = question.prompt;
    this.answerContains = question.answerContains;
    this.id = id;
  }

  id: number;
  round: number;
  number: number;
  prompt: string;
  answerContains: string[];
}

export default Question;