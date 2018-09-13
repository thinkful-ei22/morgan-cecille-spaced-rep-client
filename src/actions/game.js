import {API_BASE_URL} from '../config';
import {loadAuthToken} from '../local-storage';
import {normalizeResponseErrors} from './utils';

export const DISPLAY_GAMEPLAY = 'DISPLAY_GAMEPLAY';
export const displayGameplay = (bool) => ({
    type: DISPLAY_GAMEPLAY,
    bool
});


export const QUESTIONS_SUCCESS = 'QUESTIONS_SUCCESS';
export const questionsSuccess = (url) => ({
    type: QUESTIONS_SUCCESS,
    url
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
    .then(questionRes => {
      dispatch(questionsSuccess(questionRes));
      dispatch(displayGameplay(true));
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




export const CHECK_ANSWER_SUCCESS = 'CHECK_ANSWER_SUCCESS';
export const checkAnswerSuccess = (feedbackObj) => ({
    type: CHECK_ANSWER_SUCCESS,
    feedbackObj
});

export const checkAnswer = userInput => dispatch => {
  const token = loadAuthToken();
  return (
    fetch(`${API_BASE_URL}/api/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({answer: userInput})
    })
  )
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(feedbackObj => {
    console.log(feedbackObj)
    dispatch(checkAnswerSuccess(feedbackObj));
  })
  .catch(err => {
    const {code} = err;
    const message =
      code === 401
        ? 'Unable to get data'
        : 'Server error please try again';
      dispatch(questionsError(message));
  })
}
