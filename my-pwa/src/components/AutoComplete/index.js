import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import * as globalActions from '../../actions/global'

const styles = {
  container: {
    flexGrow: 1,
    position: 'relative',
    height: 32,
    width: '100%',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  textField: {
    margin: 0,
    paddingLeft: 10,
    paddingRight: 10,
    width: '100%',
  },
};

class IntegrationAutosuggest extends Component {
  constructor(props) {
    super(props)
    this.renderInput = this.renderInput.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.renderSuggestionsContainer = this.renderSuggestionsContainer.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.handleSuggestionsFetchRequested = this.handleSuggestionsFetchRequested.bind(this);
    this.handleSuggestionsClearRequested = this.handleSuggestionsClearRequested.bind(this);
  }

  renderInput(inputProps) {
    const { autoFocus, value, ref, ...other } = inputProps;
    return (
      <TextField
        autoFocus
        label=""
        helperText=""
        margin="dense"
        style={styles.textField}
        value={value}
        inputRef={ref}
        InputProps={{
          ...other,
        }}
      />
    );
  }

  renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion, query);
    const parts = parse(suggestion, matches);
  
    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          {parts.map((part, index) => {
            return part.highlight ? (
              <span key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </span>
            ) : (
                <strong key={String(index)} style={{ fontWeight: 500 }}>
                  {part.text}
                </strong>
              );
          })}
        </div>
      </MenuItem>
    );
  }

  renderSuggestionsContainer(options) {
    const { containerProps, children } = options;
  
    return (
      <Paper {...containerProps} square>
        {children}
      </Paper>
    );
  }

  getSuggestionValue(suggestion) {
    return suggestion;
  }

  getSuggestions(value) {
    const { suggestions } = this.props;
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;
  
    return inputLength === 0
      ? []
      : suggestions.filter(suggestion => {
        const keep = count < 5 && suggestion.toLowerCase().slice(0, inputLength) === inputValue;
  
        if (keep) {
          count += 1;
        }
  
        return keep;
      });
  }

  handleSuggestionsFetchRequested({ value }) {
    const suggestions = this.getSuggestions(value);
    this.props.actions.updateSearchSuggestions(suggestions);

    //this.setState({
    //  suggestions: this.getSuggestions(value),
    //});
  };

  handleSuggestionsClearRequested() {
    this.props.actions.updateSearchSuggestions([]);
    // this.setState({
    //   suggestions: [],
    // });
  };

  render() {
    const { 
      placeholder, 
      searchText, 
      suggestions,
      onChange
     } = this.props;

    return (
      <Autosuggest
        theme={{
          container: styles.container,
          suggestionsContainerOpen: styles.suggestionsContainerOpen,
          suggestionsList: styles.suggestionsList,
          suggestion: styles.suggestion,
        }}
        renderInputComponent={this.renderInput}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={this.renderSuggestionsContainer}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={{
          autoFocus: true,
          placeholder: placeholder,
          value: searchText,
          onChange: onChange,
        }}
      />
    );
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
    actions: bindActionCreators(globalActions, dispatch)
  })
)(IntegrationAutosuggest)