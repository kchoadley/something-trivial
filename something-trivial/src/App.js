import './App.css';
import questions from './data/questions'; import './App.css';
import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import {
  Container,
  Col,
  Row
} from 'reactstrap';
import HomePage from './pages/home';
import TrivialNavBar from './components/navbar';
import TrivialFooter from './components/footer';
import NotFoundPage from './pages/notfound';
import HostPage from './pages/host';

class App extends Component {
  componentDidMount() {
    sessionStorage.setItem('questions', JSON.stringify(questions));
  }

  render() {
    const containerStyle = {
      width: '100%',
      heightMin: '100px',
      display: "table",
      marginTop: "-25px",
      padding: "50px 0 0 0",
      boxSizing: "border-box"
    }

    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className="App">
          <TrivialNavBar />
          <Container style={containerStyle}>
            <Row style={{ marginBottom: '75px' }}>
              <Col style={{ textAlign: 'left' }}>
                <Switch>
                  <Route
                    exact path='/'
                    render={(props) => <HomePage {...props} />}
                  />
                  <Route
                    exact path='/host'
                    render={(props) => <HostPage {...props} />}
                  />
                  <Route component={NotFoundPage} />
                </Switch>
              </Col>
            </Row>
          </Container>
          <TrivialFooter />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
