import React from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import { IQuestion, IState } from '../redux/data/types';
import QuestionRow from './QuestionRow';

// Define the properties type needed by the React Component
type Props = {
  questions: IQuestion[];
};

// React component
const QuestionsTable: React.FC<Props> = (props) => {
  // "Unpack" the variables in the props so they can be used on their own.
  const questions = props.questions;

  return (
    <Table hover>
      <thead>
        <tr>
          <th>Round</th>
          <th>#</th>
          <th>Question</th>
          <th>Answer</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {
          questions.sort((a, b) => (a.round === b.round ? a.number - b.number : a.round - b.round))
            .map(question => (
              <QuestionRow question={question} key={question.id}/>
            ))
        }
      </tbody>
    </Table>
  );
};


// Construct state values to be used in the component
const mapStateToProps = (state: IState) => ({
  questions: state.questions
});

export default connect(mapStateToProps)(QuestionsTable);
