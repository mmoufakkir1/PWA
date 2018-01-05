import { createStore, applyMiddleware } from 'redux';
import appReducer from './reducers';
export default function configureStore(preloadedState) {
  return createStore(
    appReducer,
    preloadedState,
    applyMiddleware());
}