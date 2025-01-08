import { SelectInputStyle } from './styles/SelectInput.js';
export const SelectionInput = (props) => {
  return (
    <SelectInputStyle
      id={props.id}
      onChange={props.onChange}
      disabled={props.disabled}
      value={props.value}
    >
      {props.children}
    </SelectInputStyle>
  );
};
