import { createStore, applyMiddleware } from 'redux';
import appReducer from './reducers';
export default function configureStore(preloadedState) {
  return createStore(
    appReducer,
    preloadedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware());
}