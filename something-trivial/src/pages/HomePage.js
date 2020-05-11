import React from 'react';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <h1>Something Trivial</h1>
        <p>
          Welcome to the Something Trivial webapp!
        </p>
        <h2>What is Something Trival?</h2>
        <p> Something Trivial is a webapp to help facilitate hosting trivia games. The first tool to be integraded is an automated grading assistant. </p>
          <h4>Later planned features include:</h4> 
          <h5> Host Portal </h5>
            <ul> Create games (set number of question rounds). </ul>
            <ul> Create questions for a round. </ul>
            <ul> Create answer rules for a question. </ul>
            <ul> Process answers in the form of a CSV file to be graded. </ul>
            <ul> Print the graded results and enable host to make corrections. </ul>
            <ul> Score each team's answers for the round. </ul>
          <h5> Player Portal </h5>
            <ul> Player can join a game session. </ul>
            <ul> Player can set a team name. </ul>
            <ul> Player can submit answers for a game round. </ul>
            <ul> A game round will auto submit any input answers from all teams at the discretion of the host. </ul>
            <ul> Submitted answers will be graded and viewable by the host only. </ul>
            <ul> After corrections and approval from host is made, graded answers are shown to player along with the current leaderboard. </ul>
      </div>
    )
  }
}

export default HomePage