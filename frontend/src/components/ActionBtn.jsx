export const ActButton = (props) => {
  return (
    <button
      onClick={props.onClick}
      id={props.id}
      type={props.type}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
};
