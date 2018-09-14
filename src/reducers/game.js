import {
    DISPLAY_GAMEPLAY,
    GET_QUESTION_SUCCESS,
    GET_QUESTION_ERROR,
    CHECK_ANSWER_SUCCESS
} from '../actions/game';

const initialState = {
  playButton: false,
  tutorialButton: false,
  currentQuestion: null,
  feedback: null,
  error: ''
}

export default function reducer(state = initialState, action) {
  if(action.type === DISPLAY_GAMEPLAY) {
    return Object.assign({}, state, {
      playButton: action.bool
    })

  } else if(action.type === GET_QUESTION_SUCCESS) {
    return Object.assign({}, state, {
      currentQuestion: action.question,
      error: ''
    })

  } else if(action.type === GET_QUESTION_ERROR) {
    return Object.assign({}, state, {
      error: action.error
    })

  } else if (action.type === CHECK_ANSWER_SUCCESS) {
    return Object.assign({}, state, {
      feedback: action.feedbackObj
    })
    
  } else {
    return state;
  }
}
