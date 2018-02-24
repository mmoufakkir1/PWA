import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Reboot from 'material-ui/Reboot';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle, } from 'material-ui/Dialog';
import { getPage } from './router';
import { store } from './global'
import DetailPage from './components/Pages/Detail'
import TitleBar from './components/Header/TitleBar'
import Drawer from './components/Drawers/LeftDrawer'
import WelcomeScreen from './components/Intro/WelcomeScreen'
import Snackbar from 'material-ui/Snackbar';
import Fade from 'material-ui/transitions/Fade';
import * as globalActions from './actions/global';
import * as taskActions from './actions/tasks';
import * as keys from './constants/storageKeys';
import {
  isEmpty
} from './global';


import {
  defaultSnackBar,
} from './components/Snackbars/snackbarTypes';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { onboarded: false, loading: true }
    this.goToApp = this.goToApp.bind(this);
    this.closeSnackBar = this.closeSnackBar.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentWillMount() {
    window.addEventListener('resize', this.updateDimensions);
    const onBoarded = store(keys.ONBOARDED);

    console.log(' componentWillMount onBoarded ' + this.state.onboarded);
    console.log(' componentWillMount loading ' + this.state.loading);

    if (onBoarded) {
      this.setState({ loading: false })
    }
    this.goToApp();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  closeSnackBar() {
    this.props.actions.updateSnackBar(defaultSnackBar);
  }

  updateDimensions() {
    this.props.actions.updateDimensions({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  }

  goToApp() {
    const { projectItems } = this.props;
    if (isEmpty(projectItems)) {
      const items = store(keys.PROJECTS) || [];
      const tasks = store(keys.TASKS) || [];
      this.props.tasks.updateTasks(tasks)
      this.props.actions.updateProjects(items);
    }
    store(keys.ONBOARDED, false)
    //this.setState({ onboarded: true })
  }

  render() {
    const { onboarded, loading } = this.state
    const { page, options, dialog, snackbar, showTitleBar, isLogin } = this.props;
    
    const context = () => { return getPage(page, options, this.props.actions); };
   
    //if (loading) return null
    if (!isLogin) return <WelcomeScreen />;

    return (
      <div>
        <Reboot />
        {
          (showTitleBar) ? (
            <div>
              <Drawer />
              <TitleBar />
            </div>) : null
        }

        <DetailPage context={context()} />
        <Dialog
          open={dialog.open}
          onClose={dialog.onClose}
          fullScreen={dialog.fullScreen}
          aria-labelledby={dialog.fullScreen ? "responsive-dialog-title" : "form-dialog-title"}
        >
          {
            (dialog.title.length > 0) ? (
              <DialogTitle id={dialog.fullScreen ? "responsive-dialog-title" : "form-dialog-title"}>
                {dialog.title}
              </DialogTitle>) : null
          }

          <DialogContent>
            {
              (dialog.contentText.length > 0) ? (
                <DialogContentText>
                  {dialog.contentText}
                </DialogContentText>) : null
            }

            {dialog.content}
          </DialogContent>
          <DialogActions>
            {dialog.actions}
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          onClose={this.closeSnackBar}
          autoHideDuration={snackbar.duration}
          transition={Fade}
          SnackbarContentProps={{ 'aria-describedby': 'message-id' }}
          message={<span id="message-id">{snackbar.message}</span>}
        />

      </div>
    );
  }
}

export default connect(
  (state) => ({
    page: state.global.page,
    options: state.global.options,
    dialog: state.global.dialog,
    snackbar: state.global.snackbar,
    showTitleBar: state.global.showTitleBar,
    projectItems: state.projects,
    isLogin : state.global.isLogin,
  }),
  (dispatch) => ({
    actions: bindActionCreators(globalActions, dispatch),
    tasks: bindActionCreators(taskActions, dispatch),
  })
)(App)
