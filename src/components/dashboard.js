import React from 'react';
import { getQuestions, displayTutorial } from '../actions/game';
import { connect } from 'react-redux';

import Gameplay from './gameplay';
import Tutorial from './tutorial';
import SummaryProgress from './summary-progress';
import requiresLogin from './requires-login';
import '../components-css/dashboard.css';

export class Dashboard extends React.Component {
    render() {
      if(this.props.playButton === false || this.props.tutorialButton === false) {
        return (
            <div className="dashboard">
                <div className="dashboard-username">
                    Welcome {this.props.username}!
                </div>
                <div className="logo-container">
                  <h1 className="logo-dash">Atlas</h1>
                </div>
                <div className="buttons-container" onClick={() => this.props.dispatch(getQuestions())}>
                  <button className="play-button" type="button">Play</button>
                  <button className="tutorial-button" type="button" onClick={() => this.props.dispatch(displayTutorial(true))}>How to Play</button>
                </div>
                <SummaryProgress questionLevels={this.props.questionLevels} dispatch={this.props.dispatch}/>
            </div>
        );
      } else if(this.props.tutorialButton === true) {
        return (
          <div>
            <Tutorial dispatch={this.props.dispatch}/>
          </div>
        )
      } else {
        return (
          <div>
            <Gameplay dispatch={this.props.dispatch}/>
          </div>
        )
      }
    }
}

const mapStateToProps = state => {
    return {
        username: state.auth.currentUser.username,
        playButton: state.game.playButton,
        tutorialButton: state.game.tutorialButton,
        questionLevels: state.auth.questionLevels
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
