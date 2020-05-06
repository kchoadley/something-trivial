import React, { useState } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Col,
} from 'reactstrap';
import { connect } from 'react-redux';
import { IState, INewQuestion } from '../data/types';
import { createQuestion } from '../actions/questionActions';

// Define the properties type needed by the React Component
type Props = {
  onClick: (question: INewQuestion) => void;
};

// React component
const NewQuestionForm: React.FC<Props> = (props) => {
  const { onClick } = props;

  // hoist input values
  const [prompt, setPromptValue] = useState<string>("");
  const [number, setNumberValue] = useState<string>("4");
  const [answers, setAnswerValue] = useState<string[]>([""]);

  const handleNumberChange = () => (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumberValue(e.target.value);
  };

  const handlePromptChange = () => (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromptValue(e.target.value);
  };

  const handleAnswersChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let newAnswers = [...answers.slice(0, index), e.target.value, ...answers.slice(index + 1)];
    setAnswerValue(newAnswers);
  };


  const Create = () => (e: React.FormEvent) => {
    // data validation

    let question = { round: 1, number: parseInt(number), prompt: prompt, answerContains: answers }
    onClick(question);
  }

  return (
    <Form>
      <FormGroup row>
        <Col sm={4} md={3} lg={2}>
          <Label for="questionNumber">Question Number</Label>
        </Col>
        <Col sm={4} md={3} lg={2}>
          <Input type="select" name="questionNumber" id="questionNumber" value={number} onChange={handleNumberChange()}>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            <option value='6'>6</option>
            <option value='7'>7</option>
            <option value='8'>8</option>
            <option value='9'>9</option>
            <option value='10'>10</option>
          </Input>
        </Col>
      </FormGroup>
      <FormGroup>
        <Label for="prompt">Question Prompt</Label>
        <Input type="text" name="prompt" id="prompt" placeholder="Question..." value={prompt} onChange={handlePromptChange()} />
      </FormGroup>
      <FormGroup>
        <Label for="answer0">Answer should contain...</Label>
        <Input type="text" name="answer0" id="answer0" placeholder="Answer..." value={answers[0]} onChange={handleAnswersChange(0)} />
      </FormGroup>
      <FormGroup>
        <Label for="answer1">Answer should contain...</Label>
        <Input type="text" name="answer1" id="answer1" placeholder="Answer..." value={answers[1]} onChange={handleAnswersChange(1)} />
      </FormGroup>
      <Button onClick={Create()}>Create</Button>
    </Form>
  );
};

const mapStateToProps = (state: IState) => ({
  questions: state.questions
});

const dispatchProps = {
  onClick: createQuestion
}

export default connect(mapStateToProps, dispatchProps)(NewQuestionForm);
