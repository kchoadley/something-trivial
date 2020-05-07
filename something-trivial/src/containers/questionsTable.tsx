import React from 'react';
import { Button, Table, Container } from 'reactstrap';
import { connect } from 'react-redux';
import { IQuestion, IState } from '../data/types';
import { removeQuestion } from '../actions/questionActions';
import { Link } from 'react-router-dom';

// Define the properties type needed by the React Component
type Props = {
  questions: IQuestion[];
  deleteOnClick: (id: number) => void;
};

// React component
const QuestionsTable: React.FC<Props> = (props) => {
  // "Unpack" the variables in the props so they can be used on their own.
  const { questions, deleteOnClick } = props;
  // Define a function for what the button clicks do (remove the question).
  const Delete = (id: number) => (e: React.MouseEvent) => {
    console.log('Deleting question with ID: ' + id);
    deleteOnClick(id);
  }

  const questionStyle = {
    width: '100%',
    padding: "0 0 12px 0"
  }

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
              <tr key={question.id}>
                <td> {question.round} </td>
                <td> {question.number} </td>
                <td >
                  <Link to={"/question/" + question.id} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                    <Container style={questionStyle}>
                      {question.prompt}
                    </Container>
                  </Link>
                </td>
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
  questions: state.questions
});

// Construct redux actions to be used in the component
const dispatchProps = {
  deleteOnClick: removeQuestion
}

export default connect(mapStateToProps, dispatchProps)(QuestionsTable);
