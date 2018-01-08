import * as types from '../constants/actionTypes'

const initGlobalState = {
  page: 'home',
  options: {},
  title: 'FindMyList',
  drawer: false,
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

    case types.UPDATE_DRAWER:
      retVal = {...state};
      retVal.drawer = payload;
      break;

    default:
      retVal = state;
      break;    
  }
  return retVal;
}