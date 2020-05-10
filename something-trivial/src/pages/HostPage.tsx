import React from 'react';
import QuestionsTable from '../components/QuestionsTable';
import RoundSelector from '../components/RoundSelector'
import { Link } from 'react-router-dom';
import { Button, Row, Col, Container } from 'reactstrap';
import { NEW_QUESTION_PAGE } from '../components/TrivialController';

class HostPage extends React.Component {
  render() {
    return (
      <Container>
        <RoundSelector/>
        <Row>
          <Col sm='9'>
            <h2> Questions </h2>
            <p> These are the currently loaded questions. </p>
          </Col>
          <Col sm='3'>
            <Link to={NEW_QUESTION_PAGE}><Button color="primary" style={{'width': '180px'}}>Create New Question</Button></Link>
          </Col>
        </Row>
        <Row>
          <QuestionsTable />
        </Row>
      </Container>
    )
  }
}

export default HostPage
