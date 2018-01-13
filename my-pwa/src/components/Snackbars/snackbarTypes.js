import React from 'react'
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

export const defaultSnackBar = {
  action: null,
  classes: {},
  message: null,
  open: false,
  duration: 0,
}

export function showSnackBarMsg(msg, duration=2000) {
  const snackbar = {
    action: null,
    classes: {},
    message: msg,
    open: true,
    duration: duration,
  }
  return snackbar;
}