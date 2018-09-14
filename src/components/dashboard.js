import React from 'react';
import {getQuestions} from '../actions/game';
import {} from '../actions/auth';
import {connect} from 'react-redux';
import Gameplay from './gameplay';
import SummaryProgress from './summary-progress';
import requiresLogin from './requires-login';
import '../components-css/dashboard.css';

export class Dashboard extends React.Component {

    render() {
     console.log('IN DASHBOARD:', this.props.questionLevels);

      if(this.props.playButton === false) {
        return (
            <div className="dashboard">
                <div className="dashboard-username">
                    Welcome {this.props.username}!
                </div>
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
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        playButton: state.game.playButton,
        questionLevels: state.auth.questionLevels
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
