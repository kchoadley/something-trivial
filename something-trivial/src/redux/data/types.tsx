interface IQuestion {
  readonly id: number;
  readonly round: number;
  readonly number: number;
  readonly prompt: string;
  readonly answerContains: Array<string>;
}

interface INewQuestion {
  readonly round: number;
  readonly number: number;
  readonly prompt: string;
  readonly answerContains: Array<string>;
}

interface IAnswer {
  readonly id: number;
  readonly round: number;
  readonly number: number;
  readonly answer: string;
  readonly teamName: string;
}

interface INewAnswer {
  readonly round: number;
  readonly number: number;
  readonly answer: string;
  readonly teamName: string;
}

interface IState {
  readonly questions: Array<IQuestion>,
  readonly answers: Array<IAnswer>
}

export type {
  IQuestion,
  INewQuestion,
  IAnswer,
  INewAnswer,
  IState
}
