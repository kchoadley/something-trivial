import React, { useState } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Col,
  Row,
  Container,
} from 'reactstrap';
import { connect } from 'react-redux';
import { IState, INewQuestion } from '../redux/data/types';
import { createQuestion } from '../redux/actions/questionActions';
import { Redirect } from 'react-router-dom';
import { HOST_PAGE } from './TrivialController';

type Props = {
  createQuestion: (question: INewQuestion) => void;
};

const NewQuestionForm: React.FC<Props> = (props) => {
  const createQuestion = props.createQuestion;

  // connect input values
  const [redirect, setRedirectValue] = useState<string>('');
  const [gameId, setGameIdValue] = useState<string>('0');
  const [prompt, setPromptValue] = useState<string>('');
  const [round, setRoundValue] = useState<string>('1');
  const [number, setNumberValue] = useState<string>('1');
  const [answers, setAnswerValue] = useState<string[]>(['']);
  const [points, setPointsValue] = useState<number>(1);

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

  const handlePointsChange = () => (e: React.ChangeEvent<HTMLInputElement>) => {
    let parsedPoints = parseFloat(e.target.value);
    setPointsValue(isNaN(parsedPoints) ? points : parsedPoints);
  };

  const handleCreateQuestion = () => (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: data verification

    // data sanitization
    let parsedAnswers: string[] = [];
    answers.forEach(answer => { if (answer.trim().length > 0) parsedAnswers.push(answer.trim()) })

    let question = {
      gameId: parseInt(gameId),
      round: parseInt(round),
      number: parseInt(number),
      prompt: prompt,
      answerContains: parsedAnswers,
      points: points
    }

    createQuestion(question);
    setRedirectValue(HOST_PAGE);
  }

  const handleAddAnswerField = () => (e: React.MouseEvent) => {
    e.preventDefault();
    const newAnswers = [...answers, ''];
    setAnswerValue(newAnswers)
  }

  if (redirect.length > 0) {
    return <Redirect push to={redirect} />
  }

  return (
    <Form onSubmit={handleCreateQuestion()}>
      <Container>
        <Row>
          <Col>
            <FormGroup row>
              <Col>
                <Label for="prompt">Game ID</Label>
              </Col>
              <Col>
                { /* probably want to replace this with a dropdown. Dropdown options to include: gameIds the host owns currently, or "new" */}
                { /* for now, only 1 game ID exists */}
                <Input type="text" name="gameId" id="gameId" value={gameId} onChange={handleGameIdChange()} required disabled />
              </Col>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup row>
              <Col>
                <Label for="prompt">Points</Label>
              </Col>
              <Col>
                <Input type="number" name="points" min='0' max='1000' step='0.5' id="points" value={points} onChange={handlePointsChange()} required />
              </Col>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup row>
              <Col>
                <Label for="round">Round Number</Label>
              </Col>
              <Col>
                <Input type="select" name="round" id="round" value={round} onChange={handleRoundChange()}>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </Input>
              </Col>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup row>
              <Col>
                <Label for="questionNumber">Question Number</Label>
              </Col>
              <Col>
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
          </Col>
        </Row>
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
                <Input type="text" name={"answer" + index} id={"answer" + index} placeholder="Answer..." value={answer} onChange={handleAnswersChange(index)} required={(index === 0)} />
              </Col>
            </FormGroup>
          ))
        }
        <Button type='button' onClick={handleAddAnswerField()} style={{ margin: "10px" }}>(+) Answer</Button>
        <br />
        <Button type="submit" style={{ margin: "10px" }}>Create</Button>
      </Container>
    </Form>
  );
};

const mapStateToProps = (state: IState) => ({
  questions: state.questions
});

export default connect(mapStateToProps, { createQuestion })(NewQuestionForm);
