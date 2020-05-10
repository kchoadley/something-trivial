import React from 'react'
import { IQuestion, IAnswer } from '../redux/data/types'
import grade from '../services/grader';

interface Props {
  answers: IAnswer[];
  questions: IQuestion[]
}

const AnswerRow: React.FC<Props> = (props: Props) => {
  const answers = props.answers.sort();
  const questions = props.questions.sort();
  const name = answers[0].teamName;

  return (
    <tr key={name}>
      <td style={{fontWeight: "bold"}} >{name}</td>
      {
        questions.map(question => {
          let answer = answers.filter(answer => answer.number === question.number)[0];
          return (answer === undefined) ?
          <td key={question.id}>-</td> :
          (<td key={answer.id} style={grade(answer.answer, question.answerContains)}> {answer.answer} </td>);
        })
      }
    </tr>
  )
}

export default AnswerRow;
