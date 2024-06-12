import { ChangeEvent, useEffect } from 'react';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

import { AllowedActionTypes } from '../../types/data';
import { useAppDispatch } from '../../hook';
import './InputNumber.scss';

interface InputProps {
  type?: 'number' | 'count';
  setValue: ActionCreatorWithPayload<{
    key: string;
    value: number | null;
  }, AllowedActionTypes>
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
  type = 'number',
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

  useEffect(() => {
    if (name.startsWith('count_')) {

    }
  }, [])

  const onChange = (key: string, value: number) => {
    if (key === 'wt') {
      const value_wt = +(value / 100).toFixed(4);
      dispatch(setValue({ key: key, value: value_wt }));
    } else {
      dispatch(setValue({ key: key, value: value }));
    }
  };

  return (
    <label className={`input-number input-number_${type}`} >
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
        required={!name.startsWith('count_')}
        {...props}
      />
      <span className="input-number__error">{errors[name]}</span>
    </label>
  );
};
