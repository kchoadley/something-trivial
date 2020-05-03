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

class TrivialController extends Component {
  render() {
    const controllerStyle = {
      width: '100%',
      heightMin: '100px',
      display: "table",
      marginTop: "-25px",
      padding: "50px 0 0 0",
      boxSizing: "border-box"

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
              <Route component={NotFoundPage} />
            </Switch>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default TrivialController;
