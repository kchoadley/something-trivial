import React from 'react';
import { Table, Form, FormGroup, Label, Input, Row, Col, Button, ButtonToolbar, ButtonGroup, Container } from 'reactstrap';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import { IQuestion, IState, IAnswer, INewAnswer } from '../redux/data/types';
import { createAnswer, updateAnswer, removeAnswer } from '../redux/actions/answerActions';
import AnswerRow from '../components/AnswerRow';
import answersLoader from '../services/answersLoader';
import { tallyScore } from '../services/grader';
import CopyToClipboard from 'react-copy-to-clipboard';
import './RoundPage.css'

type Props = {
  questions: IQuestion[];
  answers: IAnswer[];
  createAnswer: (answer: INewAnswer) => void;
  updateAnswer: (answer: IAnswer) => void;
  removeAnswer: (id: number) => void;
};

interface RouteParams {
  round: string
}

const RoundPage: React.FC<Props> = (props) => {
  const round = parseInt(useParams<RouteParams>().round, 10);
  const questions = props.questions.filter(question => question.round === round)
    .sort((a, b) => (a.number - b.number));
  const answers = props.answers.filter(answer => answer.round === round)
    .sort((a, b) => (a.number - b.number));
  const createAnswer = props.createAnswer;
  const updateAnswer = props.updateAnswer;
  const removeAnswer = props.removeAnswer;
  const roundQuestions = questions.filter(question => question.round === round)
    .sort((a, b) => (a.number - b.number));
  const teamNames = [...(new Set(answers.map(answer => answer.teamName)))]
    .sort((a, b) => (a.toLowerCase().localeCompare(b.toLowerCase())));
  const loadAnswersFile = answersLoader(round, createAnswer);

  const gradeAnswersHandler = (e: React.MouseEvent) => {
    e.preventDefault();

    answers.forEach(answer => {
      let question = questions.filter(question => question.number === answer.number)[0];
      answer.isCorrect = question.rules.satisfies(answer.answer)
      updateAnswer(answer);
    })
  }

  const removeAnswersHandler = (e: React.MouseEvent) => {
    e.preventDefault();

    answers.forEach(answer => {
      removeAnswer(answer.id);
    })
  }

  const scoresAsColumn = () => ((teamNames.length === 0) ? '' :
    teamNames.map(teamName => (tallyScore(answers.filter(answer => answer.teamName === teamName), questions))).join('\n'));

  const namesAsColumn = () => ((teamNames.length === 0) ? '' :
    teamNames.join('\n'));

  if (questions.length === 0) {
    return (<NotFoundPage />)
  }

  return (
    <React.Fragment>
      <Row style={{ width: '85vw', marginLeft: '7.5vw' }}>
        <Col sm='9'>
          <ButtonToolbar>
            <ButtonGroup>
              <Button color='primary' onClick={gradeAnswersHandler}>[✓] Grade Answers</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button color='danger' onClick={removeAnswersHandler}>[X] Clear Answers</Button>
            </ButtonGroup>
            <ButtonGroup>
              <CopyToClipboard text={scoresAsColumn()}>
                <Button>Clipboard Scores</Button>
              </CopyToClipboard>
            </ButtonGroup>
            <ButtonGroup>
              <CopyToClipboard text={namesAsColumn()}>
                <Button>Clipboard Names</Button>
              </CopyToClipboard>
            </ButtonGroup>
          </ButtonToolbar>
        </Col>
        <Col sm='3'>
          <Form>
            <FormGroup>
              <Label for="csvAnswersFile">CSV Answers File Loader</Label>
              <Input type="file" onfocus="this.value=''" name="csvAnswersFile" id="csvAnswersFile" accept='.csv' onChange={loadAnswersFile} />
            </FormGroup>
          </Form>
        </Col>
      </Row>

      {/* <Table striped dark className='roundTable' style={{width: 'auto'}}  style={{width: '65vw', maxWidth: '95vw'}}> */}
      <div className='roundTableContainer'>
        <Table striped dark className='roundTable'>
          <thead color='red' className='roundTableHeader'>
            <tr>
              <th className='roundScoreColumn'>Score</th>
              <th className='roundTeamColumn'>Team</th>
              {
                roundQuestions.map(question => (
                  <th className='roundAnswerColumn' key={question.id}> {question.answerContains.join(', ')} </th>
                ))
              }
            </tr>
          </thead>
          <div className='roundTableBodyWrapper'>
            <tbody className='roundTableBody'>
              {
                teamNames.map(name => (
                  <AnswerRow key={name} answers={answers.filter(answer => answer.teamName === name)} questions={roundQuestions} />
                ))
              }
            </tbody>
          </div>
        </Table>
      </div>

    </React.Fragment>
  );
};

const mapStateToProps = (state: IState) => ({
  questions: state.questions,
  answers: state.answers
});

export default connect(mapStateToProps, { createAnswer, updateAnswer, removeAnswer })(RoundPage);
