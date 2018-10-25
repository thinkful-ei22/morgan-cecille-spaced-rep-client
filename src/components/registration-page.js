import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import RegistrationForm from './registration-form';
import '../components-css/registration-page.css';

export function RegistrationPage(props) {
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <div className="home">
          <div className='trans-box'>
            <RegistrationForm />
          </div>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);
