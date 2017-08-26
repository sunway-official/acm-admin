import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { reducer as formReducer } from 'redux-form';
import * as reducers from './ducks';

let store = null;

// Get the Redux DevTools extension and fallback to a no-op function
let devtools = f => f;
if (
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  process.env.NODE_ENV === 'development'
) {
  devtools = window.__REDUX_DEVTOOLS_EXTENSION__();
}

const create = (apollo, initialState = {}) =>
  createStore(
    combineReducers({
      ...reducers,
      form: formReducer, // Initialize redux form
      apollo: apollo.reducer(), // Initialize Apollo Client
    }),
    initialState,
    compose(applyMiddleware(apollo.middleware()), devtools), // Compose redux devtools
  );

export default function initRedux(apollo, initialState = {}) {
  if (!store) {
    store = create(apollo, initialState);
  }
  return store;
}
