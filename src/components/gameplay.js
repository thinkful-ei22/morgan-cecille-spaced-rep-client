import React from 'react';
import { connect } from 'react-redux';
import {displayGameplay} from '../actions/game'

export class Gameplay extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      submittedMessage: null,
      currentCountry: 'Mexico',
      currentAnswer: '',
      currentCountryUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Mexico_in_the_world_%28W3%29.svg',
    }
  }

  handleSubmit(event){
    event.preventDefault();
    const userInput = this.input.value.trim().toLowerCase();
    this.input.value = '';

    if(userInput === this.state.currentCountry.toLowerCase()){
      this.setState({submittedMessage: `Correct! The answer is ${this.state.currentCountry}!`});
    } else {
      this.setState({submittedMessage: `Oops! It's ${this.state.currentCountry}, not ${userInput}`});
    }
  }

  render() {
    if(this.state.submittedMessage){
      return (
        <div>
          <div>
            <button type="button" onClick={() => this.props.dispatch(displayGameplay(false))}>Back to Dashboard</button>
          </div>
          <h2>What is this country?</h2>

          <div style={{ position: "relative" }}>
            <img style={{ height: "200px", width: "200px", }} src={this.state.currentCountryUrl} />
          </div>

          <div>
            <p>{this.state.submittedMessage}</p>
            <button type='button'>Next</button>
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

        {/*Image src within this div will take the url from the question database*/}
        <div style={{ position: "relative" }}>
          <img style={{ height: "200px", width: "200px", }} src={this.state.currentCountryUrl} />
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
    questions: state.game.questions
  }
}

export default connect(mapStateToProps)(Gameplay);
//  https://upload.wikimedia.org/wikipedia/commons/5/5f/Mexico_in_the_world_%28W3%29.svg