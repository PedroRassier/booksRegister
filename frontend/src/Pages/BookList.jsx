import { ActButton } from '../components/ActionBtn.jsx';
import { FiRefreshCcw } from 'react-icons/fi';
import { BooksTable } from '../components/BooksTable';
import { BookListStyled } from '../components/styles/BookList.js';
import { GETBookFromDB } from '../scripts/GETBookFromDB.js';
import { useState } from 'react';
export const BookList = () => {
  const [registeredBooks, setRegisteredBooks] = useState([]);
  const handleBooks = async () => {
    const books = await GETBookFromDB();
    const formattedBooks = books.map((book) => ({
      id: book.bookID, // Renomeia para "id" esperado pelo DataGrid
      ...book,
    }));
    setRegisteredBooks(formattedBooks);
  };
  return (
    <BookListStyled>
      <ActButton onClick={handleBooks} text={<FiRefreshCcw />} />
      <BooksTable rows={registeredBooks} />
    </BookListStyled>
  );
};
