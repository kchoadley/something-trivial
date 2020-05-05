import React from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { questions: state.questions };
};

const ConnectedTable = ({ questions }) => (
  <Table hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Question</th>
        <th>Answer</th>
      </tr>
    </thead>
    <tbody>
      {questions.map(question => (
        <tr key={question.id}>
          <th scope="row"> {question.number} </th>
          <td> {question.prompt} </td>
          <td> {question.answerContains.join(', ')} </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

const QuestionsTable = connect(mapStateToProps)(ConnectedTable);

export default QuestionsTable;
