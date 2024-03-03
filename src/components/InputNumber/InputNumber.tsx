import './InputNumber.scss';
import { ChangeEvent } from 'react';

interface InputProps {
  name: string;
  isRequired?: boolean;
  errors: Record<string, string>;
  values: Record<string, string>;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const InputNumber = ({
  name,
  errors,
  values,
  handleChange,
  ...props
}: InputProps) => {
  return (
    <label className="input-number">
      <input
        className={`input-number__field${(errors[name] && ' input-number__field_type_error') || ''
          }`}
        name={name}
        placeholder='0,0000'
        step="0.0001"
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
