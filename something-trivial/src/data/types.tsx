interface IQuestion {
  id: number;
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

interface IState {
  readonly questions: Array<IQuestion>
}

export type {
  IQuestion,
  INewQuestion,
  IState
}
