import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import {
  Container,
  Col,
  Row
} from 'reactstrap';
import HomePage from '../pages/home';
import NotFoundPage from '../pages/notfound';
import HostPage from '../pages/host';
import NewQuestionForm from './newQuestionForm';
import RoundView from '../pages/round';

class TrivialController extends Component {
  render() {
    const controllerStyle = {
      width: '100%',
      heightMin: '100px',
      display: "table",
      marginTop: "-25px",
      padding: "50px 0 0 0"
    }

    return (
      <Container style={controllerStyle}>
        <Row style={{ marginBottom: '75px' }}>
          <Col style={{ textAlign: 'left' }}>
            <Switch>
              <Route
                exact path='/'
                render={(props) => <HomePage {...props} />}
              />
              <Route
                exact path='/host'
                render={(props) => <HostPage {...props} />}
              />
              <Route
                exact path='/questions/new'
                render={(props) => <NewQuestionForm {...props} />}
              />
              <Route
                exact path='/questions/:id'
                render={(props) => <NewQuestionForm {...props} />}
              />
              <Route
                exact path='/round/:round'
                render={(props) => <RoundView {...props} />}
              />
              <Route component={NotFoundPage} />
            </Switch>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default TrivialController;
