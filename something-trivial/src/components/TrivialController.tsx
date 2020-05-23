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
                exact path={HOME_PAGE}
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

const pathBuilder = (...pathVariables: string[]) => '/' + (pathVariables.join('/'))

const HOST = 'host';
const QUESTIONS = 'questions';
const ROUNDS = 'rounds';
const GAMES = 'games'
const GAME_0 = '0';
const NEW = 'new'

export const HOME_PAGE = '/';
// TODO: Actual host page needs to be designed and built. Should show information that the currently logged in host has access too, namely what games they own.
// For now, just defaulting the Host button to redirect to the default game page, showing all the questions for the default game.
export const HOST_PAGE = pathBuilder(HOST, GAMES, GAME_0);
export const VIEW_QUESTION_PAGE = (id: string) => pathBuilder(HOST, QUESTIONS, id);
export const NEW_QUESTION_PAGE = pathBuilder(HOST, QUESTIONS, NEW);
export const VIEW_ROUND_PAGE = (id: string) => pathBuilder(HOST, GAMES, GAME_0, ROUNDS, id);


export default TrivialController;
