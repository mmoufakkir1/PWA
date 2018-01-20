import * as types from '../constants/actionTypes'

const initGlobalState = {
  page: 'home',
  options: {},
  title: 'FindMyList',
  subTitle: '',
  showTitleBar: true,
  drawer: false,
  searchText: '',
  searchSuggestions: [],
  dialog: {
    actions: null,
    content: null,
    contentText: '',
    title: '',
    open: false,
    onClose: null,
    fullScreen: false,
  },
  snackbar: {
    action: null,
    classes: {},
    message: null,
    open: false,
    duration: 0,

  },
  selectedProjectId: '',
};

export default function global(state = initGlobalState, action) {
  let retVal;
  const { type, payload } = action;

  switch (type) {

    case types.UPDATE_TITLE:
      retVal = { ...state };
      retVal.title = payload;
      break;

    case types.UPDATE_SUBTITLE:
      retVal = { ...state };
      retVal.subTitle = payload;
      break;

    case types.UPDATE_SELECTED_PAGE:
      retVal = { ...state };
      retVal.page = payload;
      break;

    case types.UPDATE_SELECTED_PAGE_OPTIONS:
      retVal = { ...state };
      retVal.options = payload;
      break;

    case types.UPDATE_DRAWER:
      retVal = { ...state };
      retVal.drawer = payload;
      break;

    case types.UPDATE_DIALOG:
      retVal = { ...state };
      retVal.dialog = payload;
      break;

    case types.UPDATE_SNACKBAR:
      retVal = { ...state };
      retVal.snackbar = payload;
      break;

    case types.UPDATE_SEARCH_TEXT:
      retVal = { ...state };
      retVal.searchText = payload;
      break;

    case types.UPDATE_SEARCH_SUGGESTIONS:
      retVal = { ...state };
      retVal.searchSuggestions = payload;
      break;

    case types.SET_VISIBILITY_TITLEBAR:
      retVal = { ...state };
      retVal.showTitleBar = payload;
      break;

    case types.UPDATE_SELECTED_PROJECT_ID:
      retVal = { ...state };
      retVal.selectedProjectId = payload;
      break;

    default:
      retVal = state;
      break;
  }
  return retVal;
}