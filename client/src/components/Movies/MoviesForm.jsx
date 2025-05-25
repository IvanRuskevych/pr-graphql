import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  TextField
} from '@mui/material';

const directors = [
  {id: 1, name: 'Quentin Tarantino'},
  {id: 2, name: 'Guy Ritchie'}
];

const MoviesForm = ({open, onClose, onSubmit, initialData = {}}) => {
  const [form, setForm] = useState({
    name: '',
    genre: '',
    rate: 0,
    directorId: '',
    watched: false,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        genre: initialData.genre || '',
        rate: initialData.rate || 0,
        directorId: initialData.directorId || '',
        watched: initialData.watched || false,
      });
    }
  }, [initialData]);

  const handleChange = (field) => (e) => {
    const value = field === 'watched' ? e.target.checked : e.target.value;
    setForm((prev) => ({...prev, [field]: value}));
  };

  const handleSave = () => {
    onSubmit({...form});
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Movie Information</DialogTitle>
      <DialogContent>
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, mt: 1}}>
          <TextField label="Name" value={form.name} onChange={handleChange('name')} fullWidth />
          <TextField label="Genre" value={form.genre} onChange={handleChange('genre')} fullWidth />
          <TextField label="Rate" type="number" value={form.rate} onChange={handleChange('rate')} fullWidth />
          <TextField
            select
            label="Director"
            value={form.directorId}
            onChange={handleChange('directorId')}
            fullWidth
          >
            {directors.map((d) => (
              <MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>
            ))}
          </TextField>
          <FormControlLabel
            control={<Checkbox checked={form.watched} onChange={handleChange('watched')} />}
            label="Watched"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MoviesForm;

