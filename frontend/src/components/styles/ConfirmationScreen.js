import styled from 'styled-components';

export const ConfirmationScreenStyle = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'confirmationScreenVisibility',
})`
  visibility: ${(props) => props.confirmationScreenVisibility};
  padding: 2rem;
  max-width: 90vw;
  max-height: 90vh;
  width: fit-content;
  overflow-y: auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #c7c7c7;
  border-radius: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  word-break: break-word;

  button {
    background-color: #414141;
    color: #ffffff;
  }
  #confirma {
    margin-right: 1rem;
  }

  h3 {
    margin-bottom: 0.5rem;
  }
`;
