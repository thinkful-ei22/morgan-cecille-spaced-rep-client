import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import spinningEarth from '../images/earth-spinning-gif.gif';
import LoginForm from './login-form';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    } else if (props.loading) {
      return (
        <div>
          <p>Loading...</p>
          <img src={spinningEarth} alt='spinning GIF of the globe'/>
        </div>
      )
    }

    return (
        <div className="home">
            <h2>Build your world-geography skills!</h2>
            <img src={spinningEarth} alt='spinning GIF of the globe'/>
            <LoginForm />
            <Link to="/register">Register</Link>
            <p>Where in the World is a learning app that teaches users
              world geography.  It utilizes spaced-reptition learning to
              optimize recall abilities.
            </p>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    loading: state.auth.loading
});

export default connect(mapStateToProps)(LandingPage);
