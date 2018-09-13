import React from 'react';
import { connect } from 'react-redux';
import {displayGameplay, checkAnswer, checkAnswerSuccess, getQuestions} from '../actions/game'

export class Gameplay extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      currentAnswer: ''
    }
  }

  handleSubmit(event){
    event.preventDefault();
    const userInput = this.input.value.trim().toLowerCase();
    this.input.value = '';

    this.setState({currentAnswer: userInput}, () => {
      this.props.dispatch(checkAnswer(userInput));
    })
  }

  nextQuestion(){
    this.setState({currentAnswer: null}, () => {
      this.props.dispatch(checkAnswerSuccess(null));
      this.props.dispatch(getQuestions());
    });
  }

  render() {
    if(this.props.feedback){
      let message = `Oops! The correct answer is ${this.props.feedback.country}, not ${this.state.currentAnswer}`
      if(this.props.feedback.isCorrect){
        message = `Correct! It's ${this.props.feedback.country}!`
      }
      return (
        <div>
          <div>
            <button type="button" onClick={() => this.props.dispatch(displayGameplay(false))}>Back to Dashboard</button>
          </div>
          <h2>What is this country?</h2>

          <div style={{ position: "relative" }}>
            <img style={{ height: "200px", width: "200px", }} src={this.props.currentQuestion} alt='map of world'/>
          </div>

          <div>
            <p>{message}</p>
            <button type='button' onClick={() => this.nextQuestion()}>Next</button>
          </div>
        </div>

      )
    }

    return (
      <div>
        <div>
          <button type="button" onClick={() => this.props.dispatch(displayGameplay(false))}>Back to Dashboard</button>
        </div>
        <h2>What is this country?</h2>

        <div style={{ position: "relative" }}>
          <img style={{ height: "200px", width: "200px", }} src={this.props.currentQuestion} alt='map of world'/>
        </div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor="user-input-field">Type your guess here</label>
          <input id="user-input-field" type="text" ref={input => (this.input = input)}/>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentQuestion: state.game.currentQuestion,
    feedback: state.game.feedback
  }
}

export default connect(mapStateToProps)(Gameplay);
//  https://upload.wikimedia.org/wikipedia/commons/5/5f/Mexico_in_the_world_%28W3%29.svg