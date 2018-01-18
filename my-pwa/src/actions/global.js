import * as types from '../constants/actionTypes'

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

export function updateDrawer(value) {
  return {
    type: types.UPDATE_DRAWER,
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
