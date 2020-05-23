import React from 'react'
import { IQuestion } from '../redux/data/types'

interface Props {
  questions: IQuestion[];
}

const FixedTableHeader: React.FC<Props> = (props: Props) => {
  const questions = props.questions.sort();


  const tableStyle = {
    position: 'fixed',
    top: '0px',
    display: 'none',
    backgroundColor: 'white'
  };
  
  const tempStyle = {
    position: 'fixed',
    top: '0px',
    display: 'none'
  };

  return (
    <thead color='red' style={{position:"sticky", top: '0px', zIndex: 5}}>
    <tr>
      <th>Score</th>
      <th>Team</th>
      {
        questions.map(question => (
          <th key={question.id}> {question.answerContains.join(', ')} </th>
        ))
      }
    </tr>
  </thead>
  )
}

export default FixedTableHeader;
