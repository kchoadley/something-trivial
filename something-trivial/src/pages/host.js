import React from 'react';
import { Table } from 'reactstrap';

class HostPage extends React.Component {
  render() {
    let questions = JSON.parse(sessionStorage.getItem('questions'));
    return (
      <div>
        <h2> Questions </h2>
        <p> These are the currently loaded questions. </p>

        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Question</th>
              <th>Answer</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((e) => rowBuilder(e))}
          </tbody>
        </Table>
      </div>
    )
  }
}

function rowBuilder(e) {
  return (
    <tr>
      <th scope="row"> {e.number} </th>
      <td> {e.prompt} </td>
      <td> {e.answerContains.join(', ')} </td>
    </tr>
  )
}

export default HostPage