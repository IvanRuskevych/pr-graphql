import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BlockIcon from '@mui/icons-material/Block';

const MoviesDialog = ({open, handleClose, onConfirm}) => {
  const handleDelete = () => {
    onConfirm?.();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Movie</DialogTitle>
      <DialogContent>
        <DialogContentText>
          If you click 'Confirm', this movie will be removed from the database.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} startIcon={<BlockIcon />}>Cancel</Button>
        <Button onClick={handleDelete} variant="contained" color="error" startIcon={<DeleteForeverIcon />}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MoviesDialog;
