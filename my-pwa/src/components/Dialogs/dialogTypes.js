import React from 'react'
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import AutoComplete from '../AutoComplete';
import ClearIcon from 'material-ui-icons/Clear';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import MenuIcon from 'material-ui-icons/Menu';

const suggestions = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' },
];

const styles = {
  root: {
    width: '100%',
  },
  clearIcon: {
    position: 'absolute',
    top: 25,
    right: 8
  }
};

export const defaultDialog = {
  actions: null,
  content: null,
  contentText: '',
  title: '',
  open: false,
  onClose: null,
  fullScreen: false,
}

export function newLocationFormDialog(actionOnSave, actionOnClose) {
  const dialog = {
    actions: (
      <div>
        <Button onClick={actionOnClose} color="primary">
          Cancel
        </Button>

        <Button onClick={actionOnSave} color="primary">
          Save
        </Button>

      </div>
    ),
    content: (
      <div>
        Add content
      </div>

    ),
    contentText: 'To subscribe to this website, please enter your email address here. We will send updates occationally.',
    title: 'Subscribe',
    open: true,
    onClose: actionOnClose,
    fullScreen: false,
  }
  return dialog;
}

export function searchDialog(actionOnSave, actionOnClose) {
  const dialog = {
    title: '',
    actions: (
      <div>
        <Button onClick={actionOnClose} color="primary">
          Cancel
        </Button>

        <Button onClick={actionOnSave} color="primary">
          Save
        </Button>

      </div>
    ),
    content: (
      <div>
        <AutoComplete
          placeholder={'Search Location...'}
          suggestions={suggestions}>
        </AutoComplete>

        <IconButton style={styles.clearIcon}>
          <ClearIcon />
        </IconButton>

      </div>
    ),
    contentText: '',
    open: true,
    onClose: null,
    fullScreen: true,
  }
  return dialog;
}