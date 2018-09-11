import React from 'react';
import {getQuestions} from '../actions/game'
import {connect} from 'react-redux';
import Gameplay from './gameplay';
import requiresLogin from './requires-login';

export class Dashboard extends React.Component {

    render() {
      if(this.props.playButton === false) {
        return (
            <div className="dashboard">
                <div className="dashboard-username">
                    Username: {this.props.username}
                </div>
                <div className="play-button" onClick={() => this.props.dispatch(getQuestions())}>
                  <button type="button">Play</button>
                </div>
                <div className="tutorial-button">
                  <button type="button">How to Play</button>
                </div>
            </div>
        );
      } else {
        return (
          <div>
            <Gameplay />
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
        playButton: state.game.playButton
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
