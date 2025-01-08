import { ConfirmationScreenStyle } from './styles/confirmationScreen.js';
import { TextSection } from './TextSection.jsx';

export const ConfirmationScreen = (props) => {
  return (
    <ConfirmationScreenStyle
      confirmationScreenVisibility={props.confirmationScreenVisibility}
    >
      <form>
        <div>
          <TextSection pText={props.bookShelf} titleText="Estante" />
          <TextSection pText={props.bookRow} titleText="Linha" />
          <TextSection pText={props.bookColumn} titleText="Coluna" />
        </div>
        <TextSection pText={props.bookName} titleText="Título do Livro" />
        <TextSection pText={props.bookAuthor} titleText="Autor do Livro" />
        <TextSection pText={props.bookGenre} titleText="Gênero do Livro" />

        <TextSection
          pText={props.bookPubYear}
          titleText="Ano de publicação do Livro"
        />
        <TextSection
          pText={props.bookEditionYear}
          titleText="Ano de publicação do exemplar"
        />
      </form>
      <div>{props.children}</div>
    </ConfirmationScreenStyle>
  );
};
