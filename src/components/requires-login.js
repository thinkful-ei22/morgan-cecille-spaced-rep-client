import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import spinningEarth from '../images/earth-spinning-gif.gif';

export default () => Component => {
    function RequiresLogin(props) {
        const {authenticating, loggedIn, error, ...passThroughProps} = props;
        if (authenticating) {
            return (
              <div>
                <p>Logging in...</p>
                <img src={spinningEarth} alt='spinning GIF of the globe'/>
              </div>
            );
        } else if (!loggedIn || error) {
            return <Redirect to="/" />;
        }

        return <Component {...passThroughProps} />;
    }

    const displayName = Component.displayName || Component.name || 'Component';
    RequiresLogin.displayName = `RequiresLogin(${displayName})`;

    const mapStateToProps = (state, props) => ({
        authenticating: state.auth.loading,
        loggedIn: state.auth.currentUser !== null,
        error: state.auth.error
    });

    return connect(mapStateToProps)(RequiresLogin);
};
