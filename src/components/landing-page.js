import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import LoginForm from './login-form';
import '../components-css/landing-page.css';

export function LandingPage(props) {
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    } else if (props.loading) {
      return (
        <div className='loading-screen'>
          <p>Loading...</p>
        </div>
      )
    }



    return (
        <div className="home">
            <section className='trans-box'>

                <div className="side-photo">
                  <div className='side-photo-cover'></div>
                </div>

                <div className='login-container'>
                  <h1 className="logo-landing">Atlas</h1>
                  <div className="description-container">
                    <p className="description">Atlas is a learning app that builds your geography skills through a spaced repetition algorithm designed to boost memory retention.</p>
                  </div>
                  <LoginForm />
                  <Link className="option" to="/register">Register -></Link>
                </div>

            </section>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    loading: state.auth.loading
});

export default connect(mapStateToProps)(LandingPage);
