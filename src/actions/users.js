import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';
import {loadAuthToken} from '../local-storage';

export const registerUser = user => dispatch => {
    return fetch(`${API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .catch(err => {
            const {reason, message, location} = err;
            if (reason === 'ValidationError') {
                // Convert ValidationErrors into SubmissionErrors for Redux Form
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
        });
};


export const QUESTION_LEVEL_SUCCESS = 'QUESTION_LEVEL_SUCCESS';
export const questionLevelSuccess = questionLevels => ({
    type: QUESTION_LEVEL_SUCCESS,
    questionLevels
});


export const getQuestionLevels = () => (dispatch) => {
  const token = loadAuthToken();
  return fetch(`${API_BASE_URL}/api/users`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(questionLevels => dispatch(questionLevelSuccess(questionLevels)))
  .catch(err => console.log(err));
}