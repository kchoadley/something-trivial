import React from 'react';
import { Table, Form, FormGroup, Label, Input, FormText, Row, Col, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import { IQuestion, IState, IAnswer, INewAnswer } from '../redux/data/types';
import { createAnswer, updateAnswer, removeAnswer } from '../redux/actions/answerActions';
import AnswerRow from '../components/AnswerRow';
import answersLoader from '../services/answersLoader';
import { grade, tallyScore } from '../services/grader';
import CopyToClipboard from 'react-copy-to-clipboard';

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
    .sort();
  const loadAnswersFile = answersLoader(round, createAnswer);

  const gradeAnswersHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    
    answers.forEach(answer => {
      let question = questions.filter(question => question.number === answer.number)[0];
      let answerContains = question.answerContains;
      answer.isCorrect = grade(answer.answer, answerContains)
      updateAnswer(answer);
    })
  }

  const removeAnswersHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    
    answers.forEach(answer => {
      removeAnswer(answer.id);
    })
  }

  const scoresAsColumn = () => {
    if (teamNames.length === 0) {
      return '';
    }

    let scores = teamNames.map(teamName => (tallyScore(answers.filter(answer => answer.teamName === teamName), questions)))

    return scores.join('\n');
  }

  if (questions.length === 0) {
    return (
      <NotFoundPage />
    )
  }

  return (
    <React.Fragment>
      <CopyToClipboard text={scoresAsColumn()}><button>Copy to Clipboard</button></CopyToClipboard>
      <Row float>
        <Col></Col><Button color='primary' onClick={gradeAnswersHandler}>[✓] Grade Answers</Button><Col/>
        <Col></Col><Button color='danger' onClick={removeAnswersHandler}>[X] Clear Answers</Button><Col/>
      </Row>
      <Table striped dark>
        <thead color='red'>
          <tr>
            <th>Scores</th>
            <th>Answers</th>
            {
              roundQuestions.map(question => (
                <th key={question.id}> {question.answerContains.join(', ')} </th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            teamNames.map(name => (
              <AnswerRow key={name} answers={answers.filter(answer => answer.teamName === name)} questions={roundQuestions} />
            ))
          }
        </tbody>
      </Table >

      <Form>
        <FormGroup>
          <Row>
            <Col>
              <Label for="csvAnswersFile">CSV Answers File Loader</Label>
              <FormText color="muted">
                Select a CSV file of answers for this round to be loaded.
              </FormText>
            </Col>
            <Col>
              <Input type="file" name="csvAnswersFile" id="csvAnswersFile" accept='.csv' onChange={loadAnswersFile} />
            </Col>
          </Row>
        </FormGroup>
      </Form>
    </React.Fragment>
  );
};

const mapStateToProps = (state: IState) => ({
  questions: state.questions,
  answers: state.answers
});

export default connect(mapStateToProps, { createAnswer, updateAnswer, removeAnswer })(RoundPage);
