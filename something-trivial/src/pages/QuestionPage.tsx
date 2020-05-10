import React from 'react';
import { Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { IQuestion, IState } from '../redux/data/types';
import { useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';

type Props = {
  questions: IQuestion[];
};

interface RouteParams {
  id: string
}

const QuestionPage: React.FC<Props> = (props) => {
  const id = parseInt(useParams<RouteParams>().id, 10);
  const question = props.questions.filter(question => question.id === id)[0];

  if (question === undefined) {
    return (
      <NotFoundPage/>
    )
  }

  return (
    <Row key={question.id}>
      <Col sm='1'> {question.id} </Col>
      <Col sm='1'> {question.number} </Col>
      <Col sm='7'> {question.prompt} </Col>
      <Col sm='3'> {question.answerContains.join(', ')} </Col>
    </Row>
  );
};

const mapStateToProps = (state: IState) => ({
  questions: state.questions
});

export default connect(mapStateToProps)(QuestionPage);
