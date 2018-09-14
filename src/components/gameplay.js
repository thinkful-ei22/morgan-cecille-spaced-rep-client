import React from 'react';
import { connect } from 'react-redux';
import '../components-css/gameplay.css';
import { displayGameplay, checkAnswer, checkAnswerSuccess, getQuestions } from '../actions/game';

import ConfirmReset from './confirm-reset';

export class Gameplay extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      currentAnswer: '',
      confirmReset: false
    }
  }

  handleSubmit(event){
    event.preventDefault();
    const userInput = this.input.value.trim().toLowerCase();

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

  toggleConfirmReset = bool => {
    this.setState({confirmReset: bool})
  }

  render() {
    let confirmResetComponent = null;
    if(this.state.confirmReset === true){
      confirmResetComponent = <ConfirmReset toggleConfirmReset={this.toggleConfirmReset} dispatch={this.props.dispatch}/>
    }


    if(this.props.feedback){
      let message = `Oops! The correct answer is ${this.props.feedback.country}, not ${this.state.currentAnswer}`
      let newLevel = this.props.currentQuestion.level - 1; //default is the level goes down (pessimistic view!)
      if(this.props.feedback.isCorrect){
        message = `Correct! It's ${this.props.feedback.country}!`
        newLevel += 2;
      }
      return (
        <div className="gameplay-container">
          {confirmResetComponent}
          <h2 className="name-country">What is this country?</h2>

          <div style={{ position: "relative" }}>
            <p className="level">Your Proficiency Level on this Question: {newLevel}/5 
              <button type='button' onClick={() => this.toggleConfirmReset(true)}>Reset All Levels</button>
            </p>
            <img className="question-image" src={this.props.currentQuestion.url} alt='map of world'/>
          </div>

          <div>
            <p className="message">{message}</p>
            <button className="next-button" type='button' onClick={() => this.nextQuestion()}>Next Question</button>
            <button className="stats-button" type="button" onClick={() => this.props.dispatch(displayGameplay(false))}>Check My Progress</button>
          </div>
        </div>

      )
    }

    return (
      <div className="gameplay-container">
        {confirmResetComponent}
        <h2 className="name-country">What is this country?</h2>
        <div style={{ position: "relative" }}>
          <p className="level">Your Proficiency Level on this Question: {this.props.currentQuestion.level}/5 
            <button type='button' onClick={() => this.toggleConfirmReset(true)}>Reset All Levels</button>
          </p>
          <img className="question-image" src={this.props.currentQuestion.url} alt='map of world'/>
        </div>
        <form className="form-container" onSubmit={e => this.handleSubmit(e)}>
          <label className="input-label" htmlFor="user-input-field">Country Name: </label>
          <input className="user-input-field" type="text" ref={input => (this.input = input)}/>
          <button className="submit-button" type="submit">Submit</button>
          <button className="stats-button" type="button" onClick={() => this.props.dispatch(displayGameplay(false))}>Check My Progress</button>
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
