import React from 'react';
import { Paper } from '@material-ui/core';

const ErrorPopup = ({ message }) => {
  return (
    <Paper className="error-popup" elevation={3} style={{ backgroundColor: 'black', color: 'white' }}>
      <span>{message}</span>
    </Paper>
  );
}

export default ErrorPopup;
