import * as types from '../constants/actionTypes'

export function updateTitle(name) {
  return {
    type: types.UPDATE_TITLE,
    payload: name,
  };
}

export function updateSubTitle(name) {
  return {
    type: types.UPDATE_SUBTITLE,
    payload: name,
  };
}

export function updateSelectedPage(page) {
  return {
    type: types.UPDATE_SELECTED_PAGE,
    payload: page,
  };
}

export function updateSelectedOptions(options) {
  return {
    type: types.UPDATE_SELECTED_PAGE_OPTIONS,
    payload: options,
  };
}

export function updateDimensions(dimensions) {
  return {
    type: types.UPDATE_DIMENSIONS,
    payload: dimensions,
  };
}

export function updateDrawer(value) {
  return {
    type: types.UPDATE_DRAWER,
    payload: value,
  };
}

export function updateShowDrawer(value) {
  return {
    type: types.UPDATE_SHOW_DRAWER,
    payload: value,
  };
}

export function updateShowBackButton(value) {
  return {
    type: types.UPDATE_SHOW_BACKBUTTON,
    payload: value,
  };
}


export function updateDialog(objDialog) {
  return {
    type: types.UPDATE_DIALOG,
    payload: objDialog,
  };
}

export function updateSnackBar(objSnackBar) {
  return {
    type: types.UPDATE_SNACKBAR,
    payload: objSnackBar,
  };
}

export function updateSearchText(value) {
  return {
    type: types.UPDATE_SEARCH_TEXT,
    payload: value,
  };
}

export function updateSearchIcon(value) {
  return {
    type: types.UPDATE_SEARCH_ICON,
    payload: value,
  };
}

export function updateSearchSuggestions(suggestions) {
  return {
    type: types.UPDATE_SEARCH_SUGGESTIONS,
    payload: suggestions,
  };
}

export function updateTitleBarVisibility(value) {
  return {
    type: types.SET_VISIBILITY_TITLEBAR,
    payload: value,
  };
}

export function updateSelectedProjectId(value) {
  return {
    type: types.UPDATE_SELECTED_PROJECT_ID,
    payload: value,
  };
}

export function updateSelectedTasks(tasks) {
  return {
    type: types.UPDATE_SELECTED_TASKS,
    payload: tasks,
  };
}

//----Projects-------->
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

//<<---------End Projects
export function updateUser(user) {
  return {
    type: types.UPDATE_USER,
    payload: user,
  };
}
export function updateLoginStatus(flag) {
  return {
    type: types.UPDATE_LOGIN_STATUS,
    payload: flag,
  };
}
