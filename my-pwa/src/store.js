import { createStore, applyMiddleware } from 'redux';
import appReducer from './reducers';
import {appEnv} from './global';
export default function configureStore(preloadedState) {
  return createStore(
    appReducer,
    preloadedState,
    (appEnv === "Development") ?  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__():null,
    applyMiddleware());
}