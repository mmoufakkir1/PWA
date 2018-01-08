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
