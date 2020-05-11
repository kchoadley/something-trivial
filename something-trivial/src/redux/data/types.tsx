interface IQuestion extends INewQuestion {
  readonly id: number;
}

interface INewQuestion {
  readonly gameId: number;
  readonly round: number;
  readonly number: number;
  readonly prompt: string;
  readonly answerContains: Array<string>;
  readonly points: number;
}

interface IAnswer extends INewAnswer{
  readonly id: number;
  isCorrect?: boolean
}

interface INewAnswer {
  readonly gameId: number;
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
