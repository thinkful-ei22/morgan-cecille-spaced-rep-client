import {
    DISPLAY_GAMEPLAY
} from '../actions/game';

const initialState = {
  playButton: false,
  tutorialButton: false,
  currentCountry: '',
  currentAnswer: '',
  currentCountryUrl: ''
}

export default function reducer(state = initialState, action) {
  if(action.type === DISPLAY_GAMEPLAY) {
    return Object.assign({}, state, {
      playButton: action.bool
    })
  } else {
    return state;
  }
}
