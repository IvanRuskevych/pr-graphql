import React from 'react';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const DirectorsTable = ({directors, onEdit, onDelete}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {directors.map((director) => (
            <TableRow key={director.id}>
              <TableCell>{director.name}</TableCell>
              <TableCell>{director.age}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => onEdit(director)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(director.id)} color="secondary">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DirectorsTable;