import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import AddIcon from 'material-ui-icons/Add';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

import * as globalActions from '../../actions/global';
import * as projectActions from '../../actions/projects'

// import {
//   defaultDialog,
//   newLocationFormDialog,
//   searchDialog,
// } from '../Dialogs/dialogTypes';

import {
  showSnackBarMsg,
} from '../Snackbars/snackbarTypes';

const styles = {
  floatinButton: {
    position: 'absolute',
    bottom: 50,
    right: 35
  },
  listViewRoot: {
    marginTop: '-10px',
    width: '100%',
    // maxWidth: 360,
    // backgroundColor: theme.palette.background.paper,
  },
  listViewItem: {
    padding: 15,
  }
}

class Project extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      checked: [1],
    }
    //this.addNewTask = this.addNewTask.bind(this);

  }

  addNewTask = () => {
    this.setState({open: true});

  }

  closeForm = () => {
    this.setState({open: false});
  }

  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

  }

  render() {

    return (
      <div style={styles.listViewRoot}>
        <List>
          {[0, 1, 2, 3].map(value => (
            <div key={value}>
              <Paper elevation={4} square={true} >
                <ListItem dense button style={styles.listViewItem}>
                  <ListItemText
                    disableTypography
                    primary={<Typography type="headline">{`Line item ${value + 1}`}</Typography>}
                  />

                  <ListItemSecondaryAction>
                    <Checkbox
                      onChange={this.handleToggle(value)}
                      checked={this.state.checked.indexOf(value) !== -1}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </Paper>

            </div>

          ))}
        </List>

        <Dialog
          open={this.state.open}
          onClose={this.closeForm}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add New Task</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add a new task to this location, please enter the task name. We will send
              near by updates occationally.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="taskname"
              label="Task Name"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeForm} color="primary">
              Cancel
            </Button>
            <Button onClick={this.closeForm} color="primary">
              New Task
            </Button>
          </DialogActions>
        </Dialog>


        <Button
          fab color="primary"
          aria-label="add"
          style={styles.floatinButton}
          onClick={this.addNewTask}
        >
          <AddIcon />
        </Button>


      </div>
    );
  }
}

export default connect(
  (state) => ({
    projectid: state.global.selectedProjectId,
    page: state.global.page,
    options: state.global.options,
    drawerState: state.global.drawer,

  }),
  (dispatch) => ({
    actions: bindActionCreators(globalActions, dispatch),
    projects: bindActionCreators(projectActions, dispatch),
  })
)(Project)