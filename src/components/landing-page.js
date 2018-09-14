import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import spinningEarth from '../images/earth-spinning-gif.gif';
import '../components-css/landing-page.css';

import LoginForm from './login-form';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className="home">
            <h1 className="logo">Atlas</h1>
            <h3 className="header1">Build your knowledge...</h3>
            <h3 className="header2">...broaden your world</h3>
            <div className="earth-image-container">
              <img className="earth-image" src={spinningEarth} alt='spinning GIF of the globe'/>
            </div>
            <LoginForm />
            <Link className="option" to="/register">Register</Link>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
