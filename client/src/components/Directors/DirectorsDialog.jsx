import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

const DirectorsDialog = ({open, onClose, onConfirm}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Director</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this director?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DirectorsDialog;
