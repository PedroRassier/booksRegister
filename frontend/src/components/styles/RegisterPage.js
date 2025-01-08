import styled from 'styled-components';

export const RegisterScreenStyled = styled.div`
  padding: 2rem;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button {
    margin-top: 2rem;
    width: 10rem;
  }
  @media (max-width: 480px) {
    form {
      display: flex;
      flex-direction: column;
    }
  }
`;
