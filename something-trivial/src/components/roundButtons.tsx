import React from 'react';
import { Button, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { IState } from '../data/types';
import { Link } from 'react-router-dom';

// Define the properties type needed by the React Component
type Props = {
  rounds: number[];
};

// React component
const RoundsButtons: React.FC<Props> = (props) => {
  // "Unpack" the variables in the props so they can be used on their own.
  const rounds = props.rounds;

  return (
    <Row>
      {
        [...rounds].map(round =>
          (
          <Col sm='auto'><Link to={"/round/" + round}><Button>Round {round}</Button></Link></Col>
          ))
      }
    </Row>
  );
};


// Construct state values to be used in the component
const mapStateToProps = (state: IState) => ({
  rounds: [...(new Set(state.questions.map(q => q.round)))].sort((a,b) => a-b)
});

export default connect(mapStateToProps)(RoundsButtons);
