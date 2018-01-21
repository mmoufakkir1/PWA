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

import * as globalActions from '../../actions/global';
import * as projectActions from '../../actions/projects'

import {
  defaultDialog,
  newLocationFormDialog,
  searchDialog,
} from '../Dialogs/dialogTypes';

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
      checked: [1],
    }
    this.addNewLocation = this.addNewLocation.bind(this);
    this.closeLocationForm = this.closeLocationForm.bind(this);
    this.saveNewLocation = this.saveNewLocation.bind(this);
  }

  addNewLocation() {
    this.props.actions.updateTitleBarVisibility(false);
    this.props.actions.updateSelectedPage('searchlocations');

  }

  saveNewLocation() {
    this.props.actions.updateDialog(defaultDialog);
    this.props.actions.updateSnackBar(showSnackBarMsg("Added New Task"));
  }

  closeLocationForm() {
    this.props.actions.updateDialog(defaultDialog);
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


        <Button
          fab color="primary"
          aria-label="add"
          style={styles.floatinButton}
          onClick={this.addNewLocation}
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