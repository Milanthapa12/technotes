export const InputForm = (props) => {
  return (
    <input
      type={props.type}
      name={props.name}
      value={props.value}
      onChange={props.handleChange}
    />
  );
};

export const TextAreaForm = (props) => {
  return (
    <textarea
      name={props.name}
      rows="6"
      onChange={props.handleChange}
      defaultValue={props.value}
    />
  );
};

export const SelectOptions = (props) => {
  return (
    <select
      name={props.name}
      id={props.name}
      defaultValue={props.defaultValue}
      onChange={props.handleChange}
    >
      {props.options?.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export const SelectOption = (props) => {
  return (
    <select
      name={props.name}
      id={props.name}
      defaultValue={props.defaultValue}
      onChange={props.handleChange}
    >
      {props.options.length > 0 &&
        props.options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
    </select>
  );
};
