import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Reboot from 'material-ui/Reboot';
import Dialog, {DialogActions, DialogContent, DialogContentText, DialogTitle,} from 'material-ui/Dialog';
import { getPage } from './router';
import { store } from './global'
import DetailPage from './components/Pages/Detail'
import TitleBar from './components/Header/TitleBar'
import Drawer from './components/Drawers/LeftDrawer'
import Snackbar from 'material-ui/Snackbar';
import Fade from 'material-ui/transitions/Fade';
import * as globalActions from './actions/global';
import * as projectActions from './actions/projects';
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
  }

  componentWillMount() {
    const onBoarded = store(keys.ONBOARDED);
    if (onBoarded) {
      this.setState({ loading: false })
    }
    this.goToApp();
  }

  closeSnackBar() {
    this.props.actions.updateSnackBar(defaultSnackBar);
  }

  goToApp() {
    const { projectItems } = this.props;
    if(isEmpty(projectItems)){
      const items = store(keys.PROJECTS) || [];
      const tasks = store(keys.TASKS) || [];
      this.props.tasks.updateTasks(tasks)
      this.props.projects.updateProjects(items);
    }
    store(keys.ONBOARDED, true)
    this.setState({ onboarded: true })

  }

  render() {
    const { onboarded, loading } = this.state
    const { page, options, dialog, snackbar, showTitleBar } = this.props;
    const context = () => { return getPage(page, options); };

    if (loading) return null
    //see notes if(!onboarded) return <WelcomeScreen onPress={this.goToApp} />

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
  }),
  (dispatch) => ({
    actions: bindActionCreators(globalActions, dispatch),
    projects: bindActionCreators(projectActions, dispatch),
    tasks: bindActionCreators(taskActions, dispatch),
  })
)(App)
