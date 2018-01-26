import * as types from '../constants/actionTypes'
import {newGuid} from '../global'
const initState = [];

const reducer = (state = initState, action) => {
  let retVal;  
  const {type, payload} = action;
  switch(type){
    case types.ADD_TASK: {
      return [
        ...state,
        {
          id: newGuid(),
          createdAt: new Date(),
          completedAt: null,
          completed: false,
          text: payload.name.trim(),
          projectId: payload.projectId.trim()
        }
      ]
    }

    case types.UPDATE_TASKS:
      retVal = payload;
      break;

    case types.REMOVE_TASK: {
      return state.filter(task => task.id !== payload.id)
    }

    case types.COMPLETE_TASK: {
      return state.map(task => {
        const isCompleted = !task.complete
        return (task.id === payload.id) 
          ?
          {
            ...task,
            completed: isCompleted,
            completedAt: isCompleted ? new Date(): null
          }
          : task
      })
    }

    default: {
      return state;
    }
  }
}

export default reducer;