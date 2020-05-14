import { IAnswer, IQuestion } from "../redux/data/types";

/**
 * Simple function to grade an answer based on an array of strings that should be contained in the answer.
 * 
 * @param answer Answer to be graded
 * @param answerContains Answer should contain
 */
export const grade = (answer: string, answerContains: string[]) => {
  


  let isCorrect: boolean = true;
  let answers = answer.split(" ");

  answerContains.forEach(shouldContain => {
    let falseUntilTrue = false;
    answers.forEach(answer => {
      if ((answer.toLowerCase() === shouldContain.toLowerCase())) {
        falseUntilTrue = true;
        return;
      }
    })
    isCorrect = falseUntilTrue;
    if (!isCorrect) {
      return;
    }
  })

  return isCorrect;
};

/**
 * Simple function to grade an answer based on an array of strings that should be contained in the answer.
 * 
 * @param answer Answer to be graded
 * @param answerContains Answer should contain
 */
export const tallyScore = (answers: IAnswer[], questions: IQuestion[]) => {
  let score: number = 0;
  let isGraded = true;

  answers.forEach(answer => {
    if (answer.isCorrect === undefined) {
      isGraded = false;
    }
    if (answer.isCorrect) {
      score += questions.filter(q => q.number === answer.number)[0].points;
    }
  })

  return isGraded ? score.toString() : '-';
};

export default {
  grade,
  tallyScore
};