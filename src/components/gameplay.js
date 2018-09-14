import React from 'react';
import { connect } from 'react-redux';
import '../components-css/gameplay.css';
import { displayGameplay, checkAnswer, checkAnswerSuccess, getQuestions } from '../actions/game';

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
        <div className="gameplay-container">
          <h2 className="name-country">What is this country?</h2>

          <div style={{ position: "relative" }}>
            <p>Level: {this.props.currentQuestion.level}/5</p>
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
        <h2 className="name-country">What is this country?</h2>
        <div style={{ position: "relative" }}>
          <p className="level">Your Proficiency Level on this Question: {this.props.currentQuestion.level}/5</p>
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
