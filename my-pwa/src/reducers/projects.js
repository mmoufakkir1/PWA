import * as types from '../constants/actionTypes'
import { newGuid } from '../global'
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
          completed: false,
          tasks: []
        }
      ];
      break;

    case types.REMOVE_PROJECT:
      retVal = state.filter(project => project.id !== payload.id);
      break;

    case types.SELECT_PROJECT:
      retVal = state.filter(project => project.id === payload.id);
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
  return retVal;
}

export default reducer;