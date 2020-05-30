import React from 'react';
import QuestionsTable from '../components/QuestionsTable';
import RoundSelector from '../components/RoundSelector'
import { Row, Container } from 'reactstrap';
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
