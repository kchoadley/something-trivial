import React from 'react'
import { IQuestion } from '../redux/data/types'
import { Link } from 'react-router-dom';
import { Container, Button } from 'reactstrap';
import { removeQuestion } from '../redux/actions/questionActions';
import { connect } from 'react-redux';
import { VIEW_QUESTION_PAGE } from './TrivialController';

interface Props {
  question: IQuestion;
  deleteOnClick: (id: number) => void;
}

const QuestionRow: React.FC<Props> = (props: Props) => {
  const question = props.question;
  const deleteOnClick = props.deleteOnClick;

  const Delete = (id: number) => (e: React.MouseEvent) => {
    deleteOnClick(id);
  }

  const questionStyle = {
    width: '100%',
    padding: "0 0 12px 0"
  }

  return (
    <tr key={question.id}>
      <td> {question.round} </td>
      <td> {question.number} </td>
      <td >
        <Link to={VIEW_QUESTION_PAGE(question.id.toString())} style={{ color: 'inherit', textDecoration: 'inherit' }}>
          <Container style={questionStyle}>
            {question.prompt}
          </Container>
        </Link>
      </td>
      <td> {question.answerContains.join(', ')} </td>
      <td><Button color='danger' onClick={Delete(question.id)}>X</Button></td>
    </tr>
  )
}

// Construct redux actions to be used in the component
const dispatchProps = {
  deleteOnClick: removeQuestion
}

export default connect(null, dispatchProps)(QuestionRow);