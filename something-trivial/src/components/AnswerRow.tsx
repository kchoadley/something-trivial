import React from 'react'
import { IQuestion, IAnswer } from '../redux/data/types'
import { updateAnswer } from '../redux/actions/answerActions';
import { connect } from 'react-redux';
import { tallyScore } from '../services/grader';
import '../pages/RoundPage.css'

interface Props {
  answers: IAnswer[];
  questions: IQuestion[];
  updateAnswer: (answer: IAnswer) => void;
}

const AnswerRow: React.FC<Props> = (props: Props) => {
  const answers = props.answers.sort();
  const questions = props.questions.sort();
  const name = answers[0].teamName;
  const updateAnswer = props.updateAnswer;

  const answerStyle = (isCorrect: boolean | undefined) => (
    (isCorrect === undefined || isCorrect) ?
      {} :
      { backgroundColor: "red" }
  );

  const overrideIsCorrectHandler = (answer: IAnswer) => (e: React.MouseEvent) => {
    e.preventDefault();
    let isCorrect = (answer.isCorrect === undefined || answer.isCorrect) ? false : true;

    let updatedAnswer: IAnswer = {
      gameId: answer.gameId,
      id: answer.id,
      round: answer.round,
      number: answer.number,
      answer: answer.answer,
      teamName: answer.teamName,
      isCorrect: isCorrect,
    }

    updateAnswer(updatedAnswer);
  };

  return (
    <tr key={name}>
      <td className='roundScoreColumn'>{tallyScore(answers, questions)}</td>
      <td className='roundTeamColumn'>{name}</td>
      {
        questions.map(question => {
          let answer = answers.filter(answer => answer.number === question.number)[0];
          return (answer === undefined) ?
            <td className='roundAnswerColumn' key={question.id}>-</td> :
            (<td className='roundAnswerColumn' key={answer.id} style={answerStyle(answer.isCorrect)} onClick={overrideIsCorrectHandler(answer)}> {answer.answer} </td>);
        })
      }
    </tr>
  )
}

export default connect(null, { updateAnswer })(AnswerRow);
