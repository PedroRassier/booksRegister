import { TextSectionStyled } from './styles/TextSection';

export const TextSection = (props) => {
  return (
    <TextSectionStyled>
      <h2>{props.titleText}</h2>
      <p>{props.pText}</p>
    </TextSectionStyled>
  );
};
