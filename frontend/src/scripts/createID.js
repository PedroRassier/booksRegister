export const createID = (
  shelf,
  row,
  column,
  bookName,
  bookEditionYear,
  bookAuthor
) => {
  // Função para extrair a primeira e última letra de uma string, ignorando símbolos especiais
  const toArray = (string) => {
    // Remove símbolos especiais e espaços extras
    const cleanedString = string.replace(/[^a-zA-Z0-9]/g, '').trim();
    return cleanedString.length > 1
      ? `${cleanedString[0]}${cleanedString[cleanedString.length - 1]}` // Primeira e última letra
      : cleanedString; // Retorna a string inteira se ela tiver tamanho 1
  };

  // Extrai a parte correspondente ao autor e ao livro
  const authorPart = toArray(bookAuthor);
  const bookPart = toArray(bookName);
  // Concatena os valores no formato desejado
  const ID = `${authorPart}${bookPart}${shelf}${column}${row}${bookEditionYear}`;

  return ID.toUpperCase(); // Retorna o ID em maiúsculas
};
