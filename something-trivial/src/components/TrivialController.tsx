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
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import HostPage from '../pages/HostPage';
import NewQuestionForm from './NewQuestionForm';
import RoundPage from '../pages/RoundPage';
import QuestionPage from '../pages/QuestionPage';

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
                exact path={ROOT_PATH}
                render={(props) => <HomePage {...props} />}
              />
              <Route
                exact path={HOST_PAGE}
                render={(props) => <HostPage {...props} />}
              />
              <Route
                exact path={NEW_QUESTION_PAGE}
                render={(props) => <NewQuestionForm {...props} />}
              />
              <Route
                exact path={VIEW_QUESTION_PAGE(':id')}
                render={(props) => <QuestionPage {...props} />}
              />
              <Route
                exact path={VIEW_ROUND_PAGE(':round')}
                render={(props) => <RoundPage {...props} />}
              />
              <Route component={NotFoundPage} />
            </Switch>
          </Col>
        </Row>
      </Container>
    );
  }
}

const ROOT_PATH = '/';
const HOST_PATH = ROOT_PATH + 'host/';
const QUESTION_PATH = ROOT_PATH + 'questions/';
const ROUND_PATH = ROOT_PATH + 'rounds/';

export const HOME_PAGE = ROOT_PATH;
export const HOST_PAGE = HOST_PATH;
export const VIEW_QUESTION_PAGE = (id: string) => `${QUESTION_PATH}${id}/`;
export const NEW_QUESTION_PAGE = `${QUESTION_PATH}new/`;
export const VIEW_ROUND_PAGE = (id: string) => `${ROUND_PATH}${id}/`;

export default TrivialController;
