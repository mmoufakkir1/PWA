import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import ClearIcon from 'material-ui-icons/Clear';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';

import * as globalActions from '../../actions/global'

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
    projectItems: state.global.projects,
  }),
  (dispatch) => ({
    actions: bindActionCreators(globalActions, dispatch),
  })
)(Search)