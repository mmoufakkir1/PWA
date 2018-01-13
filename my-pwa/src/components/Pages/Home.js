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
  }
}


class Home extends Component {

  constructor(props){
    super(props)
    this.addNewLocation = this.addNewLocation.bind(this);
    this.closeLocationForm = this.closeLocationForm.bind(this);
    this.saveNewLocation = this.saveNewLocation.bind(this);
  }

  addNewLocation() {
    //const dialog = newLocationFormDialog(this.saveNewLocation, this.closeLocationForm);
    const dialog = searchDialog();
    this.props.actions.updateDialog(dialog);
    
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
    page: state.global.page,
    options: state.global.options,
    drawerState: state.global.drawer,
  }),
  (dispatch) => ({
    actions: bindActionCreators(globalActions, dispatch)
  })
)(Home)