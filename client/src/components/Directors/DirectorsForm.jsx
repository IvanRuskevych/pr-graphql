import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const DirectorsForm = ({open, onClose, onSubmit, initialData}) => {
  const [name, setName] = useState(initialData.name || '');
  const [age, setAge] = useState(initialData.age || '');

  const handleSubmit = () => {
    if (name && age) {
      onSubmit({name, age: parseInt(age, 10)});
      setName('');
      setAge('');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Director</DialogTitle>
      <DialogContent>
        <Box sx={{mt: 2, display: 'flex', flexDirection: 'column', gap: 2}}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DirectorsForm;
