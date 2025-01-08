import { Bounce, toast } from 'react-toastify';

export const validation = (
  bookName,
  bookAuthor,
  //bookPublishedYear,
  bookEditionYear
) => {
  // Verifica se o nome do livro está vazio
  if (!bookName || bookName.trim() === '') {
    toast.error('Campo incompleto: Nome do livro', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    });
    return false;
  }

  // Verifica se o nome do autor está vazio
  if (!bookAuthor || bookAuthor.trim() === '') {
    toast.error('Campo incompleto: Autor', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    });
    return false;
  }

  // Verifica se o ano de lançamento é válido (maior que 0)
  /* if (bookPublishedYear <= 0) {
    toast.error('Campo incompleto: Ano de publicação do livro', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    });
    return false;
  }*/

  // Verifica se o ano da edição é válido (maior que 0)
  if (bookEditionYear <= 0) {
    toast.error('Campo incompleto: Ano da edição do livro', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    });
    return false;
  }

  // Se todas as validações passarem, retorna true
  return true;
};
