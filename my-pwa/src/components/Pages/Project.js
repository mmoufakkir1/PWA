import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
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
import * as taskActions from '../../actions/tasks'
import * as keys from '../../constants/storageKeys';

import {
  isEmpty,
  findListById,
  store,
  isEqual,
} from '../../global';

const styles = {
  floatinButton: {
    position: 'fixed',
    bottom: 35,
    right: 25
  },
  listViewRoot: {
    marginTop: '-10px',
    width: '100%',
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
      taskName: '',
    }
    this.saveForm = this.saveForm.bind(this);
  }

  addNewTask = () => {
    this.setState({ open: true });
  }

  closeForm = () => {
    this.setState({ open: false });
  }

  saveForm = () => {
    const { taskName } = this.state;
    const { projectid } = this.props;
    if (!isEmpty(taskName)) {
      //TODO: send post
      const task = {
        name: taskName,
        projectId: projectid,
      }
      //TODO: if sucessful add to task
      this.props.tasks.addTask(task);
      this.setState({
        open: false,
        taskName: '',
      });
    }

  }

  handleOnChangeTask = (e) => {
    const { value } = e.target;
    this.setState({ taskName: value });
  }

  render() {
    const { title, taskItems, projectid } = this.props;
    const { taskName } = this.state;
    const taskList = () => {
      const filteredItems = findListById(taskItems, "projectId", projectid);
      return (
        <List>
          {
            (!isEmpty(filteredItems)) ? filteredItems.map(item => (
              <div key={item.id}>
                <Paper elevation={4} square={true} >
                  <ListItem dense button style={styles.listViewItem}>
                    <ListItemText
                      disableTypography
                      primary={<Typography type="headline">{`${item.text}`}</Typography>}
                    />
                  </ListItem>
                </Paper>

              </div>

            )) : null

          }
        </List>
      )
    }

    return (
      <div style={styles.listViewRoot}>

        {taskList()}
        <Dialog
          open={this.state.open}
          onClose={this.closeForm}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add New Task</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add a new task for {`${title}`}, please enter the task name. We will send
              near by updates occationally.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              label="Task Name"
              fullWidth
              value={taskName}
              onChange={this.handleOnChangeTask}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeForm} color="primary">
              Cancel
            </Button>
            <Button onClick={this.saveForm} color="primary">
              Save
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
    selectedTasks: state.global.selectedTasks,
    title: state.global.title,
    page: state.global.page,
    options: state.global.options,
    drawerState: state.global.drawer,
    taskItems: state.tasks,

  }),
  (dispatch) => ({
    actions: bindActionCreators(globalActions, dispatch),
    tasks: bindActionCreators(taskActions, dispatch),
  })
)(Project)