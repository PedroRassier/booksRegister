import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { RegisterScreen } from './Pages/Register.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BookList } from './Pages/BookList.jsx';

function App() {
  return (
    <>
      <Router>
        <nav>
          <Link to="/bookslist">Livros cadastrados</Link>
          <Link to="/register">Cadastrar livros</Link>
        </nav>
        <Routes>
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/bookslist" element={<BookList />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
