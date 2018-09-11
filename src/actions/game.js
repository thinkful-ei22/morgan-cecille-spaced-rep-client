import {API_BASE_URL} from '../config';
import {loadAuthToken} from '../local-storage';
import {normalizeResponseErrors} from './utils';

export const DISPLAY_GAMEPLAY = 'DISPLAY_GAMEPLAY';
export const displayGameplay = (bool) => ({
    type: DISPLAY_GAMEPLAY,
    bool
});

// export const QUESTIONS_REQUEST = 'QUESTIONS_REQUEST';
// export const questionsRequest = (bool) => ({
//     type: QUESTIONS_REQUEST
//     loading: bool
// });

export const QUESTIONS_SUCCESS = 'QUESTIONS_SUCCESS';
export const questionsSuccess = (questionsArray) => ({
    type: QUESTIONS_SUCCESS,
    questionsArray
});

export const QUESTIONS_ERROR = 'QUESTIONS_ERROR';
export const questionsError = error => ({
    type: QUESTIONS_ERROR,
    error
});

export const getQuestions = () => dispatch => {
  const token = loadAuthToken();
  return (
    fetch(`${API_BASE_URL}/api/questions`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(questionsArray => {
      dispatch(displayGameplay(true));
      dispatch(questionsSuccess(questionsArray));
    })
    .catch(err => {
      const {code} = err;
      const message =
        code === 401
          ? 'Unable to get data'
          : 'Server error please try again';
        dispatch(questionsError(message));
    })
  )
}
