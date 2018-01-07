import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from 'material-ui/TextField';
import AutoComplete from '../AutoComplete'

const suggestions = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' },
];


export default class Home extends Component {
  render() {
    return (
      <div>
      <Paper elevation={4}>
        <AutoComplete 
          placeholder={'Select Location'}
          suggestions={suggestions} 
          
        />
      </Paper>
      </div>
    );
  }
}
