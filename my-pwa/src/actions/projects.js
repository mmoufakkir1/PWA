import * as types from '../constants/actionTypes'

export const addProject = (name) => {
  return {
    type: types.ADD_PROJECT,
    payload: name
  }
}

export const removeProject = (id) => {
  return {
    type: types.REMOVE_PROJECT,
    payload: { id }
  }
}

export const completeProject = (id) => {
  return {
    type: types.COMPLETE_PROJECT,
    payload: { id }
  }
}

export const updateProjects = (projects) => {
  return {
    type: types.UPDATE_PROJECTS,
    payload: projects
  }
}
