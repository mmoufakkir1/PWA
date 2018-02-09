import * as types from '../constants/actionTypes'

const initGlobalState = {
  page: 'home',
  prevPage: '',
  options: {},
  dimensions: {
    height: 0,
    width: 0
  },
  title: 'FindMyList',
  subTitle: '',
  showTitleBar: true,
  showSearchIcon: true,
  showBackButton: false,
  showDrawer: true,
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
  selectedTasks: [],
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
      retVal.prevPage = (retVal.prevPage != payload) ? retVal.page : payload;
      retVal.page = payload;
      break;

    case types.UPDATE_SELECTED_PAGE_OPTIONS:
      retVal = { ...state };
      retVal.options = payload;
      break;

    case types.UPDATE_DIMENSIONS:
      retVal = { ...state };
      retVal.dimensions = payload;
      break;

    case types.UPDATE_DRAWER:
      retVal = { ...state };
      retVal.drawer = payload;
      break;

    case types.UPDATE_SHOW_DRAWER:
      retVal = { ...state };
      retVal.showDrawer = payload;
      break;

    case types.UPDATE_SHOW_BACKBUTTON:
      retVal = { ...state };
      retVal.showBackButton = payload;
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

    case types.UPDATE_SEARCH_ICON:
      retVal = { ...state };
      retVal.showSearchIcon = payload;
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

    case types.UPDATE_SELECTED_TASKS:
      retVal = { ...state };
      retVal.selectedTasks = payload;
      break;

    default:
      retVal = state;
      break;
  }
  return retVal;
}