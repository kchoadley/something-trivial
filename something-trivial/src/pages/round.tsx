import React from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import { IQuestion, IState } from '../data/types';
import { useParams } from 'react-router-dom';
import NotFoundPage from './notfound';

// Define the properties type needed by the React Component
type Props = {
  questions: IQuestion[];
};

interface RouteParams {
  round: string
}

// React component
const RoundView: React.FC<Props> = (props) => {
  // Get the parameter from the router
  const round = parseInt(useParams<RouteParams>().round, 10);

  // "Unpack" the variables in the props so they can be used on their own.
  const questions = props.questions.filter(question => question.round === round)
    .sort((a, b) => (a.number - b.number));

  if (isNaN(round)) {
    return (
      <NotFoundPage />
    )
  }

  if (questions.length === 0) {
    return (
      <h1>Round not found...</h1>
    )
  }

  return (
    <Table striped>
      <thead color='red'>
        <tr>
          <th>Answers</th>
          {
            questions.filter(question => question.round === round)
              .sort((a, b) => (a.number - b.number))
              .map(question => (
                <th> {question.answerContains.join(', ')} </th>
              ))
          }
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Team Alpha</td>
          {
            questions.filter(question => question.round === round)
              .sort((a, b) => (a.number - b.number))
              .map(question => (
                <td> {question.answerContains.join(', ')} </td>
              ))
          }
        </tr>
        <tr>
          <td>Team Beta</td>
          {
            questions.filter(question => question.round === round)
              .sort((a, b) => (a.number - b.number))
              .map(question => (
                <td> {question.answerContains.join(', ')} </td>
              ))
          }
        </tr>
      </tbody>
    </Table>
  );
};

// Construct state values to be used in the component
const mapStateToProps = (state: IState) => ({
  questions: state.questions
});

export default connect(mapStateToProps)(RoundView);
