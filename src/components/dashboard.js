import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';

export class Dashboard extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        play: false,
        tutorial: false
      }
      this.onPlayClick = this.onPlayClick.bind(this);
    }

    onPlayClick(bool) {
      this.setState({
        play: bool
      })
    }

    render() {
      if(this.state.play === false) {
        return (
            <div className="dashboard">
                <div className="dashboard-username">
                    Username: {this.props.username}
                </div>
                <div className="play-button" onClick={() => this.onPlayClick(true)}>
                  <button type="button">Play</button>
                </div>
                <div className="tutorial-button">
                  <button type="button">How to Play</button>
                </div>
            </div>
        );
      } else {
        <div>Placeholder div</div>
      }

    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
