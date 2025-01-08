import { Bounce, toast } from 'react-toastify';

export const GETBookFromDB = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/books');
    if (!response.ok) {
      if (response.status === 500) {
        toast.error('Erro interno no banco de dados.', {
          position: 'bottom-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        });
      }
    }
    const result = await response.json();
    return result;
  } catch {
    toast.error('Erro desconhecido ao acessar os livros.', {
      position: 'bottom-left',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    });
  }
};
