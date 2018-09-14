import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const DISPLAY_GAMEPLAY = 'DISPLAY_GAMEPLAY';
export const displayGameplay = (bool) => ({
    type: DISPLAY_GAMEPLAY,
    bool
});


export const GET_QUESTION_SUCCESS = 'GET_QUESTION_SUCCESS';
export const getQuestionSuccess = (question) => ({
    type: GET_QUESTION_SUCCESS,
    question
});

export const GET_QUESTION_ERROR = 'GET_QUESTION_ERROR';
export const getQuestionError = error => ({
    type: GET_QUESTION_ERROR,
    error
});

export const getQuestions = () => dispatch => {
  const token = localStorage.getItem('authToken');
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
      dispatch(getQuestionSuccess(questionRes));
      dispatch(displayGameplay(true));
    })
    .catch(err => {
      const {code} = err;
      const message =
        code === 401
          ? 'Unable to get data'
          : 'Server error please try again';
        dispatch(getQuestionError(message));
    })
  )
}




export const CHECK_ANSWER_SUCCESS = 'CHECK_ANSWER_SUCCESS';
export const checkAnswerSuccess = (feedbackObj) => ({
    type: CHECK_ANSWER_SUCCESS,
    feedbackObj
});

export const checkAnswer = userInput => dispatch => {
  const token = localStorage.getItem('authToken');
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
    dispatch(checkAnswerSuccess(feedbackObj));
  })
  .catch(err => {
    const {code} = err;
    const message =
      code === 401
        ? 'Unable to get data'
        : 'Server error please try again';
      dispatch(getQuestionError(message));
  })
}
