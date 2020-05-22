import React from 'react';
import QuestionsTable from '../components/QuestionsTable';
import RoundSelector from '../components/RoundSelector'
import { Link } from 'react-router-dom';
import { Button, Row, Col, Container } from 'reactstrap';
import { NEW_QUESTION_PAGE } from '../components/TrivialController';
import QuestionLoader from '../components/QuestionLoader';

class HostPage extends React.Component {
  render() {
    return (
      <Container>
        <RoundSelector/>
        <QuestionLoader/>
        <Row>
          <QuestionsTable />
        </Row>
      </Container>
    )
  }
}

export default HostPage
