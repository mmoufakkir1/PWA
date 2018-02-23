import * as types from '../constants/actionTypes';
import * as keys from '../constants/storageKeys';

import {
  newGuid,
  isEmpty,
  store
} from '../global'
const initState = [];

const reducer = (state = initState, action) => {
  let retVal;  
  const {type, payload} = action;

  switch(type){
    case types.ADD_TASK: 
      retVal = [
        ...state,
        {
          id: newGuid(),
          createdAt: new Date(),
          completedAt: null,
          completed: false,
          text: payload.task.name.trim(),
          projectId: payload.task.projectId.trim()
        }
      ]
      break;
    

    case types.UPDATE_TASKS:
      retVal = payload;
      break;

    case types.REMOVE_TASK:
      retVal = state.filter(task => task.id !== payload.id)
      break;

    case types.COMPLETE_TASK: 
      retVal = state.map(task => {
        const isCompleted = !task.completed
        return (task.id === payload.id) 
          ?
          {
            ...task,
            completed: isCompleted,
            completedAt: isCompleted ? new Date(): null
          }
          : task
      })
      break;

    default: 
      retVal = state;
      break;
    
  }

  if(!isEmpty(retVal)) {
    store(keys.TASKS, retVal);
  }

  return retVal;
}

export default reducer;