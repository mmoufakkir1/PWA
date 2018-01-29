import * as types from '../constants/actionTypes'

export const addTask = (task) => {
  return {
    type: types.ADD_TASK,
    payload: { task }
  }
}

export const removeTask = (id) => {
  return {
    type: types.REMOVE_TASK,
    payload: { id }
  }
}

export const completeTask = (id) => {
  return {
    type: types.COMPLETE_TASK,
    payload: { id }
  }
}

export const updateTasks = (tasks) => {
  return {
    type: types.UPDATE_TASKS,
    payload: tasks
  }
}
