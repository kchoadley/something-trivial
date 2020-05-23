import { IInvokerNode, IAnswerRuleNode, IOrchestratorNode } from "../redux/data/types";


/**
 * TrueNode always returns true.
 */
export class TrueNode implements IAnswerRuleNode {
  satisfies = () => true;
  remainingAnswer = '';
}

/**
 * AndNode defines an AND operation to be composed between the left and right sub-nodes.
 * 
 * If both the left and the right node return correct, then this node returns correct. Else, incorrect.
 */
export class AndNode implements IOrchestratorNode {
  constructor(left: IAnswerRuleNode, right: IAnswerRuleNode) {
    this.satisfies = (answer: string) => {
      let satisfied = this.left.satisfies(answer);
      this.remainingAnswer = left.remainingAnswer;

      if (!satisfied) {
        return satisfied;
      }

      satisfied = this.right.satisfies(this.remainingAnswer)
      this.remainingAnswer = right.remainingAnswer;
      return satisfied;
    };

    this.left = left;
    this.right = right;
  }

  satisfies: (answer: string) => boolean;
  remainingAnswer = '';
  left: IAnswerRuleNode;
  right: IAnswerRuleNode;
}

/**
 * OrNode defines an OR operation to be composed between the left and right sub-nodes.
 * 
 * If either the left or the right node return correct, then this node returns correct. Else, incorrect.
 */
export class OrNode implements IOrchestratorNode {
  constructor(left: IAnswerRuleNode, right: IAnswerRuleNode) {
    this.satisfies = (answer: string) => {
      let satisfied = this.left.satisfies(answer);
      this.remainingAnswer = left.remainingAnswer;

      if (satisfied) {
        return satisfied;
      }

      satisfied = this.right.satisfies(this.remainingAnswer)
      this.remainingAnswer = right.remainingAnswer;
      return satisfied;
    };
    
    this.left = left;
    this.right = right;
  }

  satisfies: (answer: string) => boolean;
  remainingAnswer = '';
  left: IAnswerRuleNode;
  right: IAnswerRuleNode;
}

/**
 * ContainsValueNode returns true if the answer contains the given string parameter. Else false.
 */
export class ContainsValueNode implements IInvokerNode {
  constructor(value: string) {
    this.satisfies = (answer: string) => {
      let index = answer.toLowerCase().indexOf(value.toLowerCase());

      if (index < 0) {
        this.remainingAnswer = '';
        return false;
      }

      this.remainingAnswer = (answer.slice(0, index).trim + answer.slice(index + this.parameter.length)).trim();
      return true;
    };

    this.remainingAnswer = '';
    this.parameter = value;
  }

  satisfies: (answer: string) => boolean;
  remainingAnswer: string;
  readonly parameter: string;
}

export const nodeBuilder = (nodes: string[]): IAnswerRuleNode => {
  if (nodes.length === 0) {
    return new TrueNode();
  }
  if (nodes.length === 1) {
    return new ContainsValueNode(nodes[0]);
  }
  return new AndNode(new ContainsValueNode(nodes[0]), nodeBuilder(nodes.slice(1)));
}

export default {
  nodeBuilder,
  TrueNode,
  AndNode,
  OrNode,
  ContainsValueNode
}