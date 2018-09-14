import React from 'react';
import {connect} from 'react-redux';
import '../components-css/header-bar.css';
import { authSuccess } from '../actions/auth';

export class HeaderBar extends React.Component {
    logOut() {
        this.props.dispatch(authSuccess(null));
        localStorage.clear();
    }

    render() {
        // Only render the log out button if we are logged in
        let logOutButton;
        if (this.props.loggedIn) {
            logOutButton = (
                <button className="logout-button" onClick={() => this.logOut()}>Log out</button>
            );
        }
        return (
            <div className="header-bar">
                {logOutButton}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
