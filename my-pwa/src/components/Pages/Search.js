import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import AutoComplete from '../AutoComplete'
import ClearIcon from 'material-ui-icons/Clear';
import SaveIcon from 'material-ui-icons/Save';
import CancelIcon from 'material-ui-icons/Cancel';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';

import * as globalActions from '../../actions/global'
import * as projectActions from '../../actions/projects'

import {
  isEmpty,
  searchValue,
} from '../../global'


class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
    }


    this.focusSearchInputField = this.focusSearchInputField.bind(this);
  }

  componentWillUnmount() {
    this.handleClear();
  }

  handleChange = event => {
    this.setState({ value: event.target.value })
  }

  handleClear = () => {
    this.setState({ value: '' });
    this.focusSearchInputField();
  }
  handleCancel = () => {
    this.props.actions.updateSelectedPage('home');
  }

  focusSearchInputField() {
    this.searchinput.focus();
  }


  render() {
    let filteredItems = [];
    const { dimensions, taskItems, projectItems } = this.props;
    const { value } = this.state;
    if (!isEmpty(value)) {
      filteredItems = searchValue(taskItems, projectItems, value);
    }


    const styles = {
      root: {
        width: '100%',
        marginTop: 72,
      },
      cancelButton: {
        position: 'fixed',
        right: 135,
        marginTop: `${(dimensions.height === 0) ? (window.innerHeight - 180) : dimensions.height}px`,
      },
      leftIcon: {
        marginRight: 5,
      },
      clearIcon: {
        position: 'absolute',
        top: 60,
        right: 1
      },
      textField: {
        margin: 0,
        paddingLeft: 10,
        paddingRight: 10,
        width: '100%',
      },
    };


    return (

      <div style={styles.root}>
        <TextField
          autoFocus
          name="searchinput"
          inputRef={el => this.searchinput = el}
          label=""
          placeholder="search for keywords.."
          helperText=""
          margin="dense"
          style={styles.textField}
          value={value}
          onChange={this.handleChange}
        />
        {
          (value.length > 0) ? (
            <div>
              <IconButton onClick={this.handleClear} style={styles.clearIcon}>
                <ClearIcon />
              </IconButton>
            </div>
          ) : null
        }


        <List>
          {
            (!isEmpty(filteredItems)) ? filteredItems.map(item => (
              <div key={item.id}>
                <ListItem button>
                  <ListItemText
                    primary={item.projectName}
                    secondary={item.taskName}
                  />
                </ListItem>
                <Divider />
              </div>
            )) : null
          }
        </List>

        <div style={styles.cancelButton}>

          <Button onClick={this.handleCancel} raised color="accent">
            <CancelIcon style={styles.leftIcon} />
            Cancel
          </Button>

        </div>

      </div>
    )
  }
}

export default connect(
  (state) => ({
    page: state.global.page,
    options: state.global.options,
    drawerState: state.global.drawer,
    searchText: state.global.searchText,
    suggestions: state.global.searchSuggestions,
    dimensions: state.global.dimensions,
    taskItems: state.tasks,
    projectItems: state.projects,
  }),
  (dispatch) => ({
    actions: bindActionCreators(globalActions, dispatch),
    projects: bindActionCreators(projectActions, dispatch),
  })
)(Search)