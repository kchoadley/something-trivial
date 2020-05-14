interface IQuestion extends INewQuestion {
  readonly id: number;
}

interface INewQuestion {
  readonly gameId: number;
  readonly round: number;
  readonly number: number;
  readonly prompt: string;
  readonly answerContains: Array<string>;
  readonly rules: IAnswerRuleNode;
  readonly points: number;
}

/**
 * Defines interface for a Answer Rule Node.
 * 
 * Answer rules are defined by a tree of Answer Rule Nodes. By traversing the tree,
 * you can determine if the submitted answer is correct or incorrect.
 */
interface IAnswerRuleNode {
  satisfies: (answer: string) => boolean;
  remainingAnswer: string;
}

/**
 * Defines interface for a Answer Rule Node.
 * 
 * Answer rules are defined by a tree of Answer Rule Nodes. By traversing the tree,
 * you can determine if the submitted answer is correct or incorrect.
 */
interface IOrchestratorNode extends IAnswerRuleNode {
  left: IAnswerRuleNode,
  right: IAnswerRuleNode
}

/**
 * Defines interface for a Answer Rule Node.
 * 
 * Answer rules are defined by a tree of Answer Rule Nodes. By traversing the tree,
 * you can determine if the submitted answer is correct or incorrect.
 */
interface IInvokerNode extends IAnswerRuleNode {
  readonly parameter: any
}

/**
 * isCorrect can be in one of 3 states:
 *  - ungraded (undefined)
 *  - graded as correct (true)
 *  - graded as incorrect (false)
 * We will not differentiate between auto-grading and manual grading for now.
 */
interface IAnswer extends INewAnswer {
  readonly id: number;
  isCorrect: boolean | undefined;
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
  IState,
  IAnswerRuleNode,
  IOrchestratorNode,
  IInvokerNode
}
