import React, {
  FunctionComponent,
  ChangeEvent,
  useCallback,
  useMemo,
} from "react";
import { Genre } from "../../list/helpers/get-genres";

type SelectProps = {
  label: string;
  options: Array<Genre>;
  onChange?: (id: number) => void;
  value?: number;
};

const Select: FunctionComponent<SelectProps> = (props) => {
  const { label, options = [], onChange, value } = props;

  const selectedOption = useMemo(() => options.find(({ id }) => id === value), [
    value,
  ]);
  const name = selectedOption?.name;

  const onSelectChange = useCallback((e) => {
    const { id } = options.find(({ name }) => name === e.target.value) as Genre;
    onChange && onChange(id);
  }, []);

  return (
    <>
      <label htmlFor={label}>{label}</label>
      <select
        className="form-control"
        id={label}
        onChange={onSelectChange}
        value={name}>
        <option></option>
        {options.map(({ name, id }) => (
          <option key={id}>{name}</option>
        ))}
      </select>
    </>
  );
};

export default Select;
