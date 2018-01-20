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


import * as globalActions from '../../actions/global'
import * as projectActions from '../../actions/projects'

import {
  isEmpty,
  apiUrl,
} from '../../global'

const styles = {
  root: {
    width: '100%',
    marginTop: 32,
  },
  clearIcon: {
    position: 'absolute',
    top: 20,
    right: -5
  },
  saveButton: {
    position: 'absolute',
    bottom: 20,
    right: 35,
  },
  cancelButton: {
    position: 'absolute',
    bottom: 20,
    right: 135
  },
  leftIcon: {
    marginRight: 5,
  },
};

class SearchLocations extends Component {

  constructor(props) {
    super(props);
    this.clearSearchText = this.clearSearchText.bind(this);
    this.onSeachTextChange = this.onSeachTextChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentWillUnmount() {
    this.clearSearchText();
  }
  clearSearchText() {
    this.props.actions.updateSearchText('');
    this.props.actions.updateSearchSuggestions([]);
  }

  handleCancel() {
    this.props.actions.updateSelectedPage('home');
  }

  handleSave() {
    const { searchText } = this.props;
    if(!isEmpty(searchText)){
      this.props.projects.addProject(searchText);
      this.props.actions.updateTitle(searchText);
      this.props.actions.updateSelectedPage('home');
    }
  }

  onSeachTextChange(event, { newValue }) {
    let suggestionList = [];
    if (!isEmpty(newValue)) {
      this.props.actions.updateSearchText(newValue);
      if (newValue.length >= 3) {
        const uri = `${apiUrl}/autocomplete?q=${newValue}`;
        axios.get(uri).then((response) => {
          if (!isEmpty(response.data)) {
            for (let i = 0; i < response.data.length; i++) {
              suggestionList.push(response.data[i].shortName)
            }
          }
          this.props.actions.updateSearchSuggestions(suggestionList);
        }).catch((error) => {
          console.log(error);
        });
      }
    } else {
      this.props.actions.updateSearchText('');
    }
  }

  render() {
    const { searchText, suggestions } = this.props;
    return (
      <div style={styles.root}>
        <AutoComplete
          placeholder={'Search Location...'}
          suggestions={suggestions}
          onChange={this.onSeachTextChange}
        >
        </AutoComplete>
        {
          (searchText.length > 0) ? (
            <div>
              <IconButton onClick={this.clearSearchText} style={styles.clearIcon}>
                <ClearIcon />
              </IconButton>
            </div>
          ) : null
        }

        <div>

          <Button onClick={this.handleSave} style={styles.saveButton} raised dense>
            <SaveIcon style={styles.leftIcon} />
            &nbsp;Save&nbsp;  
          </Button>

          <Button onClick={this.handleCancel} style={styles.cancelButton} raised color="accent">
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
  }),
  (dispatch) => ({
    actions: bindActionCreators(globalActions, dispatch),
    projects: bindActionCreators(projectActions, dispatch),
  })
)(SearchLocations)