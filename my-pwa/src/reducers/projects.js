import * as types from '../constants/actionTypes'
import * as keys from '../constants/storageKeys';

import { 
  newGuid,
  store,
  isEmpty, 
} from '../global'
const initState = [];

const reducer = (state = initState, action) => {
  let retVal;

  const { type, payload } = action;

  switch (type) {

    case types.ADD_PROJECT:
      retVal = [
        ...state,
        {
          id: newGuid(),
          name: payload.trim(),
          createdAt: new Date(),
          completedAt: null,
          completed: false
        }
      ];
      
      break;

    case types.UPDATE_PROJECTS:
      retVal = payload;
      break;


    case types.REMOVE_PROJECT:
      retVal = state.filter(project => project.id !== payload.id);
      break;


    case types.COMPLETE_PROJECT:
      retVal = state.map(project => {
        const isCompleted = !project.complete
        return (project.id === project.id)
          ?
          {
            ...project,
            completed: isCompleted,
            completedAt: isCompleted ? new Date() : null
          }
          : project
      });
      break;

    default:
      retVal = state;
  }

  if(!isEmpty(retVal)) {
    store(keys.PROJECTS, retVal);
  }
  
  return retVal;
}

export default reducer;