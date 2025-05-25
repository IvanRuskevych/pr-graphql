import React, { useState } from 'react';
import DirectorsDialog from "./DirectorsDialog.jsx";
import { Box, Fab, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DirectorsTable from "./DirectorsTable.jsx";
import DirectorsForm from "./DirectorsForm.jsx";

const initialMockData = [
  {id: '1', name: 'Quentin Tarantino', age: 60},
  {id: '2', name: 'Christopher Nolan', age: 53},
];

const Directors = () => {
  const [directors, setDirectors] = useState(initialMockData);
  const [formOpen, setFormOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDirector, setEditingDirector] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const handleOpenForm = (director = null) => {
    setEditingDirector(director);
    setFormOpen(true);
  };

  const handleFormSubmit = (data) => {
    if (editingDirector) {
      setDirectors((prev) =>
        prev.map((d) => (d.id === editingDirector.id ? {...d, ...data} : d))
      );
    } else {
      setDirectors((prev) => [
        ...prev,
        {...data, id: Date.now().toString()},
      ]);
    }
    setFormOpen(false);
  };

  const handleDelete = (id) => {
    setDeletingId(id);
    setDialogOpen(true);
  };

  const confirmDelete = () => {
    setDirectors((prev) => prev.filter((d) => d.id !== deletingId));
    setDialogOpen(false);
    setDeletingId(null);
  };

  return (
    <Box sx={{p: 3}}>
      <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 2}}>
        <Typography variant="h4">Directors</Typography>
        <Fab color="primary" onClick={() => handleOpenForm()}>
          <AddIcon />
        </Fab>
      </Box>
      <DirectorsTable
        directors={directors}
        onEdit={handleOpenForm}
        onDelete={handleDelete}
      />
      <DirectorsForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingDirector || {}}
      />
      <DirectorsDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={confirmDelete}
      />
    </Box>
  );
};

export default Directors;
