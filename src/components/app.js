import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import HeaderBar from './header-bar';
import LandingPage from './landing-page';
import Dashboard from './dashboard';
import RegistrationPage from './registration-page';
import { authSuccess } from '../actions/auth';
import '../components-css/app.css';

export class App extends React.Component {

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
    }

    render() {
        return (
            <div className="app">

              <main className="routes">
                <HeaderBar />
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/register" component={RegistrationPage} />
              </main>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(App));
