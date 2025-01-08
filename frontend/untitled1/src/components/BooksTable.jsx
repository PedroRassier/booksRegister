import { DataGrid } from '@mui/x-data-grid';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';

import { ActButton } from './ActionBtn';
import { FaTrash } from 'react-icons/fa';
import { DELETEBookFromDB } from '../scripts/DELETEBookFromDB';
import { useState } from 'react';

export const BooksTable = (props) => {
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [bookIDToDelete, setBookIDToDelete] = useState(null);

  const handleDelete = (bookID) => {
    DELETEBookFromDB(bookID);
    setDeleteDialog(false);
  };
  const handleOpenDialog = (bookID) => {
    setDeleteDialog(true);
    setBookIDToDelete(bookID);
  };
  const handleCloseDialog = () => {
    setDeleteDialog(false);
  };
  const columns = [
    { field: 'bookID', headerName: 'ID', flex: 1 },
    { field: 'bookName', headerName: 'Nome do Livro', flex: 2 },
    { field: 'bookPublishedYear', headerName: 'Ano de publicação', flex: 1 },
    { field: 'bookGenre', headerName: 'Gênero', flex: 1 },
    { field: 'bookAuthor', headerName: 'Autor', flex: 2 },
    { field: 'bookEditionYear', headerName: 'Ano da edição', flex: 1 },
    {
      field: 'action',
      headerName: '',
      flex: 0.5,
      renderCell: (params) => (
        <ActButton
          onClick={() => {
            handleOpenDialog(params.id);
          }}
          text={<FaTrash />}
        />
      ),
    },
  ];
  return (
    <>
      <DataGrid
        rows={props.rows}
        columns={columns}
        pageSize={5}
        sx={{
          width: '100%',
          maxWidth: '100vw',
          backgroundColor: '#ffffff',
          '@media (max-width: 768px)': {
            fontSize: '12px', // Reduz o tamanho do texto em telas menores
          },
        }}
      />
      <Dialog open={deleteDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza de que deseja deletar este livro? Essa ação não pode ser
            desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={() => handleDelete(bookIDToDelete)}
            color="secondary"
            autoFocus
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
