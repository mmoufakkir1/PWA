import { combineReducers } from 'redux';
import global from './global';
import tasks from './tasks';
import projects from './projects';

const appReducer = combineReducers({
  global,
  tasks,
  projects,
  
});
export default appReducer;