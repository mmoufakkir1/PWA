import { combineReducers } from 'redux';
import global from './global';
import tasks from './tasks';

const appReducer = combineReducers({
  global,
  tasks,
  
});
export default appReducer;