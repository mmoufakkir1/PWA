import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import AddIcon from 'material-ui-icons/Add';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

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

import {
  findByIdFirst,
  isEmpty,
} from '../../global';

const styles = {
  floatinButton: {
    position: 'absolute',
    bottom: 50,
    right: 35
  }
}

class Project extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: '',
    }

    this.addNewLocation = this.addNewLocation.bind(this);
    this.closeLocationForm = this.closeLocationForm.bind(this);
    this.saveNewLocation = this.saveNewLocation.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({id: nextProps.id});
  }

  shouldComponentUpdate(nextProps, nextState) {
    let retVal = true;
    if (!isEmpty(nextState)) {
      if (nextProps.projectid !== nextState.id) {
        retVal = true;
      } else {
        retVal = false;
      }
    }
    return retVal;
  }

  componentDidMount() {
    const { id, projectList } = this.props;
    const project = findByIdFirst(projectList, id);
    if (project) {
      this.props.actions.updateTitle(project.name);
      this.props.actions.updateTitleBarVisibility(true);
      this.props.actions.updateDrawer(false);
      this.setState({id: id});
    }
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

  render() {

    return (
      <div>

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
    projectList: state.projects,
    page: state.global.page,
    options: state.global.options,
    drawerState: state.global.drawer,

  }),
  (dispatch) => ({
    actions: bindActionCreators(globalActions, dispatch),
    projects: bindActionCreators(projectActions, dispatch),
  })
)(Project)