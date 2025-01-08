import {InputTextStyled} from "./styles/InputText.js";

export const TextInput = (props) => {
  return (
    <InputTextStyled
      type={props.type}
      value={props.value}
      id={props.id}
      disabled={props.disabled}
      placeholder={props.placeholder}
      minLength={1}
      maxLength={props.maxLength}
      onChange={props.onChange}
    />
  );
};
