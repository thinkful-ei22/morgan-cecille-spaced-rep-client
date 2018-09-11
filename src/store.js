import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';
import {loadAuthToken, loadState, saveState} from './local-storage';
import authReducer from './reducers/auth';
import {setAuthToken, refreshAuthToken} from './actions/auth';

const persistedState = loadState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    combineReducers({
        form: formReducer,
        auth: authReducer
    }),
    persistedState,
    composeEnhancers(
      applyMiddleware(thunk)
));

store.subscribe(() =>{
  saveState(store.getState());
})

// // Hydrate the authToken from localStorage if it exist
// const authToken = loadAuthToken();
// if (authToken) {
//     const token = authToken;
//     store.dispatch(setAuthToken(token));
//     store.dispatch(refreshAuthToken());
// }

export default store;
