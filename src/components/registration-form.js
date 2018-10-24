import React from 'react';
import { Link } from 'react-router-dom';
import {Field, reduxForm, focus} from 'redux-form';
import {registerUser} from '../actions/users';
import {login} from '../actions/auth';
import Input from './input';
import '../components-css/registration-form.css'
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';
const passwordLength = length({min: 8, max: 72});
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {
    onSubmit(values) {
        const {username, password} = values;
        const user = {username, password};
        return this.props
            .dispatch(registerUser(user))
            .then(() => this.props.dispatch(login(username, password)));
    }

    render() {
        return (
          <div>

            <div className="side-photo">
              <div className='side-photo-cover'></div>
            </div>

            <div className='register-container'>
              <h1 className="logo-register">Atlas</h1>
              <div className="description-container">
                <p className="description">Atlas is a learning app that builds your geography skills through a spaced repetition algorithm designed to boost memory retention.</p>
              </div>
              <form
                  className="login-form"
                  onSubmit={this.props.handleSubmit(values =>
                      this.onSubmit(values)
                  )}>
                  <label className="label" htmlFor="username">Username</label>
                  <Field
                      component={Input}
                      type="text"
                      name="username"
                      validate={[required, nonEmpty, isTrimmed]}
                  />
                  <label className="label" htmlFor="password">Password</label>
                  <Field
                      component={Input}
                      type="password"
                      name="password"
                      validate={[required, passwordLength, isTrimmed]}
                  />
                  <label className="label" htmlFor="passwordConfirm">Confirm password</label>
                  <Field
                      component={Input}
                      type="password"
                      name="passwordConfirm"
                      validate={[required, nonEmpty, matchesPassword]}
                  />
                  <button
                      className="register-button"
                      type="submit"
                      disabled={this.props.pristine || this.props.submitting}>
                      Register
                  </button>
              </form>
              <Link className="option" to="/">Login -></Link>
            </div>
            

          </div>
        );
    }
}

export default reduxForm({
    form: 'registration',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);
