import React from 'react';
import { Table, Form, FormGroup, Label, Input, FormText, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import { IQuestion, IState, IAnswer, INewAnswer } from '../redux/data/types';
import { createAnswer } from '../redux/actions/answerActions';
import AnswerRow from '../components/AnswerRow';
import answersLoader from '../services/answersLoader';

type Props = {
  questions: IQuestion[];
  answers: IAnswer[];
  createAnswer: (answer: INewAnswer) => void;
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
  const roundQuestions = questions.filter(question => question.round === round)
    .sort((a, b) => (a.number - b.number));
  const teamNames = [...(new Set(answers.map(answer => answer.teamName)))]
    .sort();
  const loadAnswersFile = answersLoader(round, createAnswer);

  if (questions.length === 0) {
    return (
      <NotFoundPage />
    )
  }

  return (
    <React.Fragment>
      <Table striped dark>
        <thead color='red'>
          <tr>
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

export default connect(mapStateToProps, { createAnswer })(RoundPage);
