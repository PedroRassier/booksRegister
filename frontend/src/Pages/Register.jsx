import { useState } from 'react';
import { validation } from '../scripts/validation.js';
import { TextInput } from '../components/InputText.jsx';
import { SelectionInput } from '../components/SelectInput.jsx';
import { Form } from '../components/styles/Form.js';
import { createID } from '../scripts/createID.js';
import { POSTTODb } from '../scripts/POSTToDB.js';
import { handleChange } from '../scripts/changeObjectValue.js';
import { ActButton } from '../components/ActionBtn.jsx';
import { RegisterScreenStyled } from '../components/styles/RegisterPage.js';
import { SelectionArea } from '../components/styles/SelectionArea.js';
import { TextInputArea } from '../components/styles/TextInputArea.js';
import { ConfirmationScreen } from '../components/confirmationScreen.jsx';

export const RegisterScreen = () => {
  const [allowSubmit, setAllowSubmit] = useState(false);
  const [bookShelf, setBookShelf] = useState(0);
  const [bookRow, setBookRow] = useState(0);
  const [bookColumn, setBookColumn] = useState(0);
  const [bookName, setBookName] = useState('');
  const [bookPublishedYear, setBookPublishedYear] = useState('');
  const [bookGenre, setBookGenre] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [bookEditionYear, setBookEditionYear] = useState('');
  //const [bookID, setBookID] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [confirmationVisibility, setConfirmationVisibility] =
    useState('hidden');
  const resetForm = () => {
    setBookShelf(0); // Resetando o valor do shelf para o default (0)
    setBookRow(0); // Resetando a linha para o valor padrão
    setBookColumn(0); // Resetando a coluna para o valor padrão
    setBookName(''); // Resetando o nome do livro
    setBookPublishedYear(''); // Resetando o ano de publicação
    setBookGenre(''); // Resetando o gênero
    setBookAuthor(''); // Resetando o autor
    setBookEditionYear(''); // Resetando o ano da edição
    setDisabled(true); // Mantendo os selects desabilitados
    setConfirmationVisibility('hidden');
  };
  // Função para lidar com a mudança do "bookShelf"
  const handleRegisterButton = () => {
    const validSubmit = validation(
      bookName,
      bookAuthor,
      //bookPublishedYear,
      bookEditionYear
    );
    if (validSubmit) {
      setDisabled(true);
      setAllowSubmit(true);
      setConfirmationVisibility('');
    }
  };
  const doSubmit = () => {
    if (allowSubmit) {
      const bookID = createID(
        bookShelf,
        bookRow,
        bookColumn,
        bookName,
        bookEditionYear,
        bookAuthor
      );
      const payload = {
        bookID,
        bookName,
        bookPublishedYear: Number(bookPublishedYear) || null,
        bookGenre: bookGenre || null,
        bookAuthor,
        bookEditionYear: Number(bookEditionYear),
      };
      POSTTODb(payload).then();
      resetForm();
      setDisabled(false);
    }
  };
  const userCorrects = () => {
    setConfirmationVisibility('hidden');
    setAllowSubmit(false);
    setDisabled(false);
  };
  // Função de submit do formulário
  return (
    <RegisterScreenStyled>
      <ConfirmationScreen
        bookAuthor={bookAuthor}
        bookColumn={bookColumn}
        bookRow={bookRow}
        bookShelf={bookShelf}
        bookPubYear={bookPublishedYear}
        bookEditionYear={bookEditionYear}
        bookName={bookName}
        bookGenre={bookGenre}
        confirmationScreenVisibility={confirmationVisibility}
      >
        <ActButton text={'Confirmar'} onClick={doSubmit} id={'confirma'} />
        <ActButton text={'Corrigir'} onClick={userCorrects} />
      </ConfirmationScreen>
      <Form onSubmit={handleRegisterButton}>
        <SelectionArea>
          <SelectionInput
            id={'bookShelf'}
            disabled={disabled}
            value={bookShelf}
            onChange={handleChange(setBookShelf)}
          >
            <option disabled={true} value={0}>
              Escolha uma estante
            </option>
            <option value={1}>1</option>
            <option value={2}>2</option>
          </SelectionInput>
          <SelectionInput
            id={'bookColumn'}
            disabled={disabled}
            value={bookColumn}
            onChange={handleChange(setBookColumn)}
          >
            <option disabled={true} value={0}>
              Escolha uma coluna
            </option>
            <option value={1}>1</option>
            <option value={2}>2</option>
          </SelectionInput>
          <SelectionInput
            id={'bookRow'}
            value={bookRow}
            disabled={disabled}
            onChange={handleChange(setBookRow)}
          >
            <option disabled={true} value={0}>
              Escolha uma linha
            </option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </SelectionInput>
        </SelectionArea>
        <TextInputArea>
          <TextInput
            id={'bookName'}
            disabled={disabled}
            value={bookName}
            placeholder={'Título do livro'}
            maxLength={255}
            onChange={handleChange(setBookName)}
          />
          <TextInput
            id={'bookAuthor'}
            disabled={disabled}
            value={bookAuthor}
            placeholder={'Autor'}
            maxLength={225}
            onChange={handleChange(setBookAuthor)}
          />
          <TextInput
            id={'bookGenre'}
            disabled={disabled}
            value={bookGenre}
            placeholder={'Gênero'}
            maxLength={30}
            onChange={handleChange(setBookGenre)}
          />
          <TextInput
            id={'bookPublishedYear'}
            disabled={disabled}
            value={bookPublishedYear}
            placeholder={'Ano de publicação do livro'}
            type={'number'}
            onChange={handleChange(setBookPublishedYear)}
          />
          <TextInput
            id={'bookEditionYear'}
            disabled={disabled}
            value={bookEditionYear}
            placeholder={'Ano de publicação da edição'}
            type={'number'}
            onChange={handleChange(setBookEditionYear)}
          />
        </TextInputArea>
      </Form>
      <ActButton
        text={'Cadastrar'}
        onClick={handleRegisterButton}
        disabled={disabled}
      />
    </RegisterScreenStyled>
  );
};
