import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import HeaderBar from './header-bar';
import LandingPage from './landing-page';
import Dashboard from './dashboard';
import RegistrationPage from './registration-page';
import {/* refreshAuthToken, */ authSuccess} from '../actions/auth';

export class App extends React.Component {
    // componentDidUpdate(prevProps) {
    //     if (!prevProps.loggedIn && this.props.loggedIn) {
    //         // When we are logged in, refresh the auth token periodically
    //         this.startPeriodicRefresh();
    //     } else if (prevProps.loggedIn && !this.props.loggedIn) {
    //         // Stop refreshing when we log out
    //         this.stopPeriodicRefresh();
    //     }
    // }

    componentWillMount(){
      const token = localStorage.getItem('authToken');
      if(token){
        const decodedToken = jwtDecode(token);
        this.props.dispatch(authSuccess(decodedToken.user));
      }

    }

    componentWillUnmount() {
      const token = localStorage.getItem('authToken');
      localStorage.clear();
      if(token){
        localStorage.setItem('authToken', token);
      }
      // this.stopPeriodicRefresh();
    }

    // startPeriodicRefresh() {
    //     this.refreshInterval = setInterval(
    //         () => this.props.dispatch(refreshAuthToken()),
    //         60 * 60 * 1000 // One hour
    //     );
    // }

    // stopPeriodicRefresh() {
    //     if (!this.refreshInterval) {
    //         return;
    //     }

    //     clearInterval(this.refreshInterval);
    // }

    render() {
        return (
            <div className="app">
                <HeaderBar />
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/register" component={RegistrationPage} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App));
