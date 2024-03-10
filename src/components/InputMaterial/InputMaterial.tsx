import { ChangeEvent } from 'react';

import { fetchMaterial, setNumberValue } from '../../store/timeSlice';
import { useAppDispatch, useAppSelector } from '../../hook';
import { IMaterial } from '../../types/data';

import './InputMaterial.scss';

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
  const dispatch = useAppDispatch();
  const { matList } = useAppSelector(state => state.time);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(fetchMaterial(e.target.value));
    handleChange(e);
    console.log('e:', e.target.value);
  };

  const handlerMaterialClick = (mat: IMaterial) => {
    const qValue = +mat.q;
    const pValue = +mat.p;
    dispatch(
      setNumberValue({
        key: 'q',
        value: qValue,
      }),
    );
    dispatch(
      setNumberValue({
        key: 'p',
        value: pValue,
      }),
    );
  };

  return (
    <div className="material">
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
            onChange={onChange}
            required
            {...props}
          />
          <span className="input__error">{errors[name]}</span>
        </div>
      </label>
      {matList.length !== 0 && (
        <ul className="material__list">
          {matList.map((material, index) => {
            return (
              <li className="material__item" key={index}>
                <button
                  className="material__button"
                  type="button"
                  onClick={() => handlerMaterialClick(material)}
                >
                  {material.name}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
