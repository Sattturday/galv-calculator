import { ChangeEvent } from 'react';

import './InputNumber.scss';

interface InputProps {
  name: string;
  isRequired?: boolean;
  errors: Record<string, string>;
  values: Record<string, string>;
  placeholder?: string;
  step?: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const InputNumber = ({
  name,
  errors,
  values,
  handleChange,
  placeholder = '0,0000',
  step = '0.0001',
  ...props
}: InputProps) => {
  return (
    <label className="input-number">
      <input
        className={`input-number__field${
          (errors[name] && ' input-number__field_type_error') || ''
        }`}
        name={name}
        placeholder={placeholder}
        min="0"
        step={step}
        type="number"
        value={values[name] || ''}
        onChange={handleChange}
        required
        {...props}
      />
      <span className="input-number__error">{errors[name]}</span>
    </label>
  );
};
