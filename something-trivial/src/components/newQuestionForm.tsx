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
import { Redirect } from 'react-router-dom';

// Define the properties type needed by the React Component
type Props = {
  onClick: (question: INewQuestion) => void;
};

// React component
const NewQuestionForm: React.FC<Props> = (props) => {
  const { onClick } = props;

  // default form values
  const defaultPrompt = "";
  const defaultRound = "1";
  const defaultNumber = "1";
  const defaultAnswers = ["", ""];

  // connect input values
  const [redirect, setRedirectValue] = useState<string>('');
  const [prompt, setPromptValue] = useState<string>(defaultPrompt);
  const [round, setRoundValue] = useState<string>(defaultRound);
  const [number, setNumberValue] = useState<string>(defaultNumber);
  const [answers, setAnswerValue] = useState<string[]>(defaultAnswers);

  // handle changes
  const handleRoundChange = () => (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoundValue(e.target.value);
  };

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

  const resetFields = () => {
    setPromptValue(defaultPrompt);
    setRoundValue(defaultRound);
    setNumberValue(defaultNumber);
    setAnswerValue(defaultAnswers);
  }

  // on submit, create
  const Create = () => (e: React.FormEvent) => {
    // prevent page refresh
    e.preventDefault();

    // TODO: data verification

    // data sanitization
    let parsedAnswers: string[] = [];
    answers.forEach(answer => { if (answer.trim().length > 0) parsedAnswers.push(answer.trim()) })

    let question = { round: parseInt(round), number: parseInt(number), prompt: prompt, answerContains: parsedAnswers }
    onClick(question);
    resetFields();
    setRedirectValue('/host');
    
  }

  if (redirect.length > 0) {
    return <Redirect push to={redirect} />
  }
  else {

  }
  return (
    <Form onSubmit={Create()}>
      <FormGroup row>
        <Col sm={4} md={3} lg={2}>
          <Label for="round">Round Number</Label>
        </Col>
        <Col sm={4} md={3} lg={2}>
          <Input type="select" name="round" id="round" value={round} onChange={handleRoundChange()}>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </Input>
        </Col>
      </FormGroup>
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
      <FormGroup row>
        <Col sm={4} md={3} lg={2}>
          <Label for="prompt">Question Prompt</Label>
        </Col>
        <Col sm={8} md={9} lg={10} >
          <Input type="textarea" name="prompt" id="prompt" placeholder="Question..." value={prompt} onChange={handlePromptChange()} required />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col sm={4} md={3} lg={2}>
          <Label for="answer0">Answer Contains</Label>
        </Col>
        <Col sm={8} md={9} lg={10} >
          <Input type="text" name="answer0" id="answer0" placeholder="Answer..." value={answers[0]} onChange={handleAnswersChange(0)} required />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col sm={4} md={3} lg={2}>
          <Label for="answer1">Answer Contains</Label>
        </Col>
        <Col sm={8} md={9} lg={10} >
          <Input type="text" name="answer0" id="answer0" placeholder="Answer..." value={answers[0]} onChange={handleAnswersChange(0)} required />
        </Col>
      </FormGroup>
      <Button type="submit">Create</Button>
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
