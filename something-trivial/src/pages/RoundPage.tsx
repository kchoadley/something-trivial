import React from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import { IQuestion, IState, IAnswer } from '../redux/data/types';

type Props = {
  questions: IQuestion[];
  answers: IAnswer[];
};

interface RouteParams {
  round: string
}

const RoundPage: React.FC<Props> = (props) => {
  const round = parseInt(useParams<RouteParams>().round, 10);
  console.log(round);
  const questions = props.questions.filter(question => question.round === round)
    .sort((a, b) => (a.number - b.number));
  const answers = props.answers.filter(answer => answer.round === round)
    .sort((a, b) => (a.number - b.number));
  const teamNames = [...(new Set(answers.map(answer => answer.teamName)))].sort();

  if (questions.length === 0) {
    return (
      <NotFoundPage />
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
        {
          teamNames.map(name => (
            < tr key={name}>
              <td>{name}</td>
              {
                answers.filter(answer => answer.teamName === name)
                  .sort((a, b) => (a.number - b.number))
                  .map(answer => (
                    <td> {answer.answer} </td>
                  ))
              }
            </tr>
          ))
        }
      </tbody>
    </Table >
  );
};

const mapStateToProps = (state: IState) => ({
  questions: state.questions,
  answers: state.answers
});

export default connect(mapStateToProps)(RoundPage);
