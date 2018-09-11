import {
    DISPLAY_GAMEPLAY,
    QUESTIONS_SUCCESS,
    QUESTIONS_ERROR
} from '../actions/game';

const initialState = {
  playButton: false,
  tutorialButton: false,
  questions: [],
  error: ''
}

export default function reducer(state = initialState, action) {
  if(action.type === DISPLAY_GAMEPLAY) {
    return Object.assign({}, state, {
      playButton: action.bool
    })
  } else if(action.type === QUESTIONS_SUCCESS) {
    return Object.assign({}, state, {
      questions: [...action.questionsArray]
    })
  } else if(action.type === QUESTIONS_ERROR) {
    return Object.assign({}, state, {
      error: action.error
    })
  } else {
    return state;
  }
}
