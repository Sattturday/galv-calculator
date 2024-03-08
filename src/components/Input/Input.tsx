import { ChangeEvent } from 'react';

import './Input.scss';

interface InputProps {
  name: string;
  title: string;
  type: string;
  placeholder: string;
  minLength?: number;
  isRequired?: boolean;
  errors: Record<string, string>;
  values: Record<string, string>;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  name,
  title,
  isRequired,
  errors,
  values,
  handleChange,
  ...props
}: InputProps) => {
  return (
    <label className="input">
      <span className="input__name">
        {title}
        {isRequired && <span>*</span>}
      </span>
      <div className="input__wrap">
        <input
          className={`input__field${
            (errors[name] && ' input__field_type_error') || ''
          }`}
          name={name}
          value={values[name] || ''}
          onChange={handleChange}
          required
          {...props}
        />
        <span className="input__error">{errors[name]}</span>
      </div>
    </label>
  );
};
