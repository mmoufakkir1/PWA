import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Reboot from 'material-ui/Reboot';
import { getPage } from './router';
import { store } from './global'
import DetailPage from './components/Pages/Detail'
import TitleBar from './components/Header/TitleBar'
import Drawer from './components/Drawers/LeftDrawer'
import Snackbar from 'material-ui/Snackbar';
import Fade from 'material-ui/transitions/Fade';
import * as globalActions from './actions/global';
import * as keys from './constants/storageKeys';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

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
    store(keys.ONBOARDED, true)
    this.setState({ onboarded: true })
  }

  render() {
    const { onboarded, loading } = this.state
    const { page, options, dialog, snackbar } = this.props;
    const context = () => { return getPage(page, options); };

    if (loading) return null
    //see notes if(!onboarded) return <WelcomeScreen onPress={this.goToApp} />

    return (
      <div>
        <Reboot />
        <Drawer />
        <TitleBar />
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
  }),
  (dispatch) => ({
    actions: bindActionCreators(globalActions, dispatch)
  })
)(App)
