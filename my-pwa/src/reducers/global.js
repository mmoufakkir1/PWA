import * as types from '../constants/actionTypes'

const initGlobalState = {
  page: 'home',
  options: {}
};

export default function global(state = initGlobalState, action) {
  let retVal;
  const {type, payload} = action;

  switch(type){
    case types.UPDATE_SELECTED_PAGE:
      retVal = {...state};
      retVal.page = payload;
      break;
    
    case types.UPDATE_SELECTED_PAGE_OPTIONS:
      retVal = {...state};
      retVal.options = payload;
      break;

    default:
      retVal = state;
      break;    
  }
  return retVal;
}