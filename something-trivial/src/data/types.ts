interface Question {
  id: number;
  readonly round: number;
  readonly number: number;
  readonly prompt: string;
  readonly answerContains: Array<string>;
}

interface State {
  readonly questions: Array<Question>
}

export type {
  Question,
  State
}
