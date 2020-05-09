import React from 'react';
import QuestionsTable from '../components/questionsTable';
import RoundsButtons from '../components/roundButtons'
import { Link } from 'react-router-dom';
import { Button, Row, Col, Container } from 'reactstrap';

class HostPage extends React.Component {
  render() {
    return (
      <Container>
        <RoundsButtons></RoundsButtons>
        <Row>
          <Col sm='9'>
            <h2> Questions </h2>
            <p> These are the currently loaded questions. </p>
          </Col>
          <Col sm='3'>
            <Link to='/questions/new'><Button color="primary" style={{'width': '180px'}}>Create New Question</Button></Link>
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
