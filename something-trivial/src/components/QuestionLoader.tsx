import React from 'react'
import { INewQuestion } from '../redux/data/types'
import { createQuestion } from '../redux/actions/questionActions';
import { connect } from 'react-redux';
import { Form, FormGroup, Row, Col, Label, Input, ButtonToolbar, ButtonGroup, Button } from 'reactstrap';
import questionsLoader from '../services/questionsLoader';
import { Link } from 'react-router-dom';
import { NEW_QUESTION_PAGE } from './TrivialController';

interface Props {
  createQuestion: (question: INewQuestion) => void;
}

const QuestionLoader: React.FC<Props> = (props: Props) => {
  const createQuestion = props.createQuestion;

  const loadQuestionsFile = questionsLoader(createQuestion)

  return (
    <React.Fragment>
      <Row style={{ width: '95vw'}}>
        <Col sm='3'>
            <h2> Questions </h2>
            <p> These are the currently loaded questions. </p>
        </Col>

        <Col sm='3'>
          <Form>
            <FormGroup>
              <Label for="csvQuestionsFile">CSV Questions File Loader</Label>
              <Input type="file" name="csvQuestionsFile" id="csvQuestionsFile" accept='.csv' onChange={loadQuestionsFile} />
            </FormGroup>
          </Form>
        </Col>

        <Col sm='3'>
          <ButtonToolbar>
            <ButtonGroup>
            <Link to={NEW_QUESTION_PAGE}><Button color="primary" style={{'width': '180px'}}>Create New Question</Button></Link>
            </ButtonGroup>
          </ButtonToolbar>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default connect(null, { createQuestion })(QuestionLoader);
