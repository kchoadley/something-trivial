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
import { IState, INewQuestion } from '../redux/data/types';
import { createQuestion } from '../redux/actions/questionActions';
import { Redirect } from 'react-router-dom';
import { HOST_PAGE } from './TrivialController';

// Define the properties type needed by the React Component
type Props = {
  createQuestion: (question: INewQuestion) => void;
};

// React component
const NewQuestionForm: React.FC<Props> = (props) => {
  const { createQuestion } = props;

  // default form values
  const defaultPrompt = "";
  const defaultRound = "1";
  const defaultNumber = "1";
  const defaultAnswers = [""];

  // connect input values
  const [redirect, setRedirectValue] = useState<string>('');
  const [gameId, setGameIdValue] = useState<string>(defaultPrompt);
  const [prompt, setPromptValue] = useState<string>(defaultPrompt);
  const [round, setRoundValue] = useState<string>(defaultRound);
  const [number, setNumberValue] = useState<string>(defaultNumber);
  const [answers, setAnswerValue] = useState<string[]>(defaultAnswers);

  // handle changes
  const handleRoundChange = () => (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoundValue(e.target.value);
  };

  const handleGameIdChange = () => (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameIdValue('0');
  };

  const handleNumberChange = () => (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumberValue(e.target.value);
  };

  const handlePromptChange = () => (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromptValue(e.target.value);
  };

  const handleAnswersChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswers = [...answers.slice(0, index), e.target.value, ...answers.slice(index + 1)];
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

    let question = { round: parseInt(round), number: parseInt(number), prompt: prompt, answerContains: parsedAnswers, gameId: parseInt(gameId) }
    createQuestion(question);
    resetFields();
    setRedirectValue(HOST_PAGE);
    
  }

  const AddAnswerClick = () => (e: React.MouseEvent) => {
    e.preventDefault();
    const newAnswers = [...answers, ''];
    setAnswerValue(newAnswers)
  }

  if (redirect.length > 0) {
    return <Redirect push to={redirect} />
  }

  return (
    <Form onSubmit={Create()}>
    <FormGroup row>
      <Col sm={4} md={3} lg={2}>
        <Label for="prompt">Game ID</Label>
      </Col>
      <Col sm={2} md={2} lg={2} >
        { /* probably want to replace this with a dropdown. Dropdown options to include: gameIds the host owns currently, or "new" */ }
        { /* for now, only 1 game ID exists */ }
        <Input type="text" name="gameId" id="gameId" placeholder="0" value={gameId} onChange={handleGameIdChange()} required disabled/>
      </Col>
    </FormGroup>
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
      {
        answers.map((answer, index) => (
            <FormGroup key={'answer' + index} row>
              <Col sm={4} md={3} lg={2}>
                <Label for={"answer" + index}>Answer Contains</Label>
              </Col>
              <Col sm={8} md={9} lg={10} >
                <Input type="text" name={"answer" + index} id={"answer" + index} placeholder="Answer..." value={answer} onChange={handleAnswersChange(index)} required={(index===0)}/>
              </Col>
            </FormGroup>
          ))
      }
      <Button type='button' onClick={AddAnswerClick()} style={{margin:"10px"}}>(+) Answer</Button>
      <br/>
      <Button type="submit" style={{margin:"10px"}}>Create</Button>
    </Form>
  );
};

const mapStateToProps = (state: IState) => ({
  questions: state.questions
});

export default connect(mapStateToProps, { createQuestion })(NewQuestionForm);
