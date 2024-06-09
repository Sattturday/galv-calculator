import { ChangeEvent } from 'react';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

import { useAppDispatch } from '../../hook';
import './InputNumber.scss';

interface InputProps {
  setValue: ActionCreatorWithPayload<{
    key: string;
    value: number | null;
  }, "time/setNumberValue" | "thickness/setNumberValue" | "weight/setNumberValue" | 'density/setNumberValue'>
  name: string;
  isRequired?: boolean;
  errors: Record<string, string>;
  values: Record<string, string>;
  placeholder?: string;
  step?: string;
  min?: string;
  max?: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const InputNumber = ({
  setValue,
  name,
  errors,
  values,
  handleChange,
  placeholder = '0,0000',
  step = '0.0001',
  min = '0.0001',
  max,
  ...props
}: InputProps) => {
  const dispatch = useAppDispatch();

  const onChange = (key: string, value: number) => {
    if (key === 'wt') {
      const value_wt = +(value / 100).toFixed(4);
      dispatch(setValue({ key: key, value: value_wt }));
    } else {
      dispatch(setValue({ key: key, value: value }));
    }
  };

  return (
    <label className="input-number">
      <input
        className={`input-number__field${(errors[name] && ' input-number__field_type_error') || ''
          }`}
        name={name}
        placeholder={placeholder}
        min={min}
        max={max ? max : 'auto'}
        step={step}
        type="number"
        value={values[name] || ''}
        onChange={e => {
          const value = e.target.value;
          handleChange(e);
          onChange(name, +value);
        }}
        required
        {...props}
      />
      <span className="input-number__error">{errors[name]}</span>
    </label>
  );
};
