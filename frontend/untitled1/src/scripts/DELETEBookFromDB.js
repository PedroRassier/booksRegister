import { Bounce, toast } from 'react-toastify';

export const DELETEBookFromDB = async (book) => {
  try {
    // Fazendo a requisição DELETE
    const response = await fetch('http://127.0.0.1:5000/deletebook', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json', // Certifique-se de que o tipo é JSON
      },
      body: JSON.stringify({ bookID: book }), // Enviando o corpo como JSON
    });

    // Verificando a resposta da API
    if (!response.ok) {
      if (response.status === 500) {
        toast.error('Erro ao deletar o livro.', {
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
    } else {
      toast.success('Livro deletado com sucesso!', {
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
  } catch {
    toast.error('Erro desconhecido ao tentar deletar o livro.', {
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
