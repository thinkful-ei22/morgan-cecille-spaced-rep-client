import React from 'react';
import { getQuestions } from '../actions/game';
import { connect } from 'react-redux';

import Gameplay from './gameplay';
import SummaryProgress from './summary-progress';
import requiresLogin from './requires-login';
import '../components-css/dashboard.css';

export class Dashboard extends React.Component {
    render() {
      if(this.props.playButton === false) {
        return (
            <div className="dashboard">
                <div className="dashboard-username">
                    Welcome {this.props.username}!
                </div>
                <h1 className="logo">Atlas</h1>
                <div className="buttons-container" onClick={() => this.props.dispatch(getQuestions())}>
                  <button className="play-button" type="button">Play</button>
                  <button className="tutorial-button" type="button">How to Play</button>
                </div>
                <SummaryProgress questionLevels={this.props.questionLevels} dispatch={this.props.dispatch}/>
            </div>
        );
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
        questionLevels: state.auth.questionLevels
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
