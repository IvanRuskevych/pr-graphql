import React, { useState } from 'react';
import { Box, Fab, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoviesTable from "./MoviesTable.jsx";
import MoviesForm from "./MoviesForm.jsx";

const initialMockData = [
  {
    id: '1',
    name: 'Pulp Fiction',
    genre: 'Crime',
    rate: 10,
    watched: true,
    director: {name: 'Quentin Tarantino'},
    directorId: 1
  },
  {id: '2', name: 'Snatch', genre: 'Comedy', rate: 9, watched: false, director: {name: 'Guy Ritchie'}, directorId: 2},
];

const Movies = () => {
  const [movies, setMovies] = useState(initialMockData);
  const [formOpen, setFormOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState({});

  const handleOpenForm = (movie = null) => {
    setEditingMovie(movie);
    setFormOpen(true);
  };

  const handleFormSubmit = (data) => {
    if (editingMovie) {
      setMovies((prev) =>
        prev.map(m => m.id === editingMovie.id ? {...m, ...data} : m));
    } else {
      setMovies((prev) => [...prev, {...data, id: Date.now().toString(), director: {name: "Mock"}}]);
    }
    setFormOpen(false);
  };

  const handleDelete = (id) => {
    setMovies((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <Box sx={{p: 3}}>
      <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 2}}>
        <Typography variant="h4">Movies</Typography>
        <Fab color="primary" onClick={() => handleOpenForm()}>
          <AddIcon />
        </Fab>
      </Box>

      <MoviesTable movies={movies} onEdit={handleOpenForm} onDelete={handleDelete} />
      <MoviesForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingMovie}
      />
    </Box>
  );
};

export default Movies;


