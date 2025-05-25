import React, { useState } from 'react';
import {
  Box,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoviesDialog from "./MoviesDialog.jsx";

const MoviesTable = ({movies, onEdit, onDelete}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleMenuClick = (event, movie) => {
    setAnchorEl(event.currentTarget);
    setSelectedMovie(movie);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleEdit = () => {
    onEdit(selectedMovie);
    handleMenuClose();
  };

  const handleDelete = () => {
    setDialogOpen(true);
    handleMenuClose();
  };

  return (
    <Box>
      <MoviesDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        onConfirm={() => onDelete(selectedMovie.id)}
      />
      <Paper sx={{overflowX: 'auto'}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell align="right">Rate</TableCell>
              <TableCell>Director</TableCell>
              <TableCell>Watched</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((movie) => (
              <TableRow key={movie.id}>
                <TableCell>{movie.name}</TableCell>
                <TableCell>{movie.genre}</TableCell>
                <TableCell align="right">{movie.rate}</TableCell>
                <TableCell>{movie.director.name}</TableCell>
                <TableCell><Checkbox checked={movie.watched} disabled /></TableCell>
                <TableCell align="right">
                  <IconButton onClick={(e) => handleMenuClick(e, movie)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                    <MenuItem onClick={handleEdit}><EditIcon fontSize="small" /> Edit</MenuItem>
                    <MenuItem onClick={handleDelete}><DeleteIcon fontSize="small" /> Delete</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default MoviesTable;

