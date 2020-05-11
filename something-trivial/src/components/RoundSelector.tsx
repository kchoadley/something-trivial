import React from 'react';
import { Button, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { IState } from '../redux/data/types';
import { Link } from 'react-router-dom';
import { VIEW_ROUND_PAGE } from './TrivialController';

type Props = {
  rounds: number[];
};

const RoundSelector: React.FC<Props> = (props) => {
  const rounds = props.rounds;

  return (
    <Row>
      {
        rounds.map(round => (
          <Col sm='auto' key={round}>
            <Link to={VIEW_ROUND_PAGE(round.toString())}>
              <Button>
                Round {round}
              </Button>
            </Link>
          </Col>))
      }
    </Row>
  );
};

// Construct state values to be used in the component
const mapStateToProps = (state: IState) => ({
  rounds: [...(new Set(state.questions.map(q => q.round)))].sort((a, b) => a - b)
});

export default connect(mapStateToProps)(RoundSelector);
