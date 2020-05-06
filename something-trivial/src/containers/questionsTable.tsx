import React from 'react';
import { Button, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { IQuestion, IState } from '../data/types';
import { removeQuestion } from '../actions/questionActions';

// Define the properties type needed by the React Component
type Props = {
  questions:  IQuestion[];
  round: number;
  deleteOnClick: (id: number) => void;
};

// React component
const QuestionsTable: React.FC<Props> = (props) => {
  // "Unpack" the variables in the props so they can be used on their own.
  const { questions, round, deleteOnClick } = props;
  // Define a function for what the button clicks do (remove the question).
  const Delete = (id: number) => (e: React.MouseEvent) => {
    console.log('Deleting question with ID: ' + id);
    deleteOnClick(id);
  }

  return (
    <Table hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Question</th>
          <th>Answer</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {
          questions.filter(question => question.round === round)
            .sort((a, b) => (a.number - b.number))
            .map(question => (
              <tr key={question.id}>
                <th scope="row"> {question.number} </th>
                <td> {question.prompt} </td>
                <td> {question.answerContains.join(', ')} </td>
                <td><Button color='danger' onClick={Delete(question.id)}>X</Button></td>
              </tr>
            ))
        }
      </tbody>
    </Table>
  );
};


// Construct state values to be used in the component
const mapStateToProps = (state: IState) => ({
  questions: state.questions,
  round: 1
});

// Construct redux actions to be used in the component
const dispatchProps = {
  deleteOnClick: removeQuestion
}

export default connect(mapStateToProps, dispatchProps)(QuestionsTable);
