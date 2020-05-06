import React from 'react';
import QuestionsTable from '../containers/questionsTable';
import NewQuestionForm from '../components/newQuestionForm';

class HostPage extends React.Component {
  render() {
    return (
      <div>
        <h2> Questions </h2>
        <p> These are the currently loaded questions. </p>
        <QuestionsTable />
        <NewQuestionForm />
      </div>
    )
  }
}

export default HostPage
