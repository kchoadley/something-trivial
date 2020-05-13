import React from 'react'
import { INewQuestion } from '../redux/data/types'
import { createQuestion } from '../redux/actions/questionActions';
import { connect } from 'react-redux';
import { Form, FormGroup, Row, Col, Label, FormText, Input } from 'reactstrap';
import questionsLoader from '../services/questionsLoader';

interface Props {
  createQuestion: (question: INewQuestion) => void;
}

const QuestionLoader: React.FC<Props> = (props: Props) => {
  const createQuestion = props.createQuestion;

  const loadQuestionsFile = questionsLoader(createQuestion)

  return (
    <Form>
      <FormGroup>
        <Row>
          <Col>
            <Label for="csvQuestionsFile">CSV Questions File Loader</Label>
            <FormText color="muted">
              Select a CSV file of questions for this game to be loaded.
            </FormText>
          </Col>
          <Col>
            <Input type="file" name="csvQuestionsFile" id="csvQuestionsFile" accept='.csv' onChange={loadQuestionsFile} />
          </Col>
        </Row>
      </FormGroup>
    </Form>
  )
}

export default connect(null, { createQuestion })(QuestionLoader);
