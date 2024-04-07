import { ChangeEvent, useEffect, useState } from 'react';

import { clearMatList, fetchMaterial } from '../../store/materialSlice';
import { useAppDispatch, useAppSelector } from '../../hook';
import { Material } from '../../types/data';

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
  setNumberValue: (key: string, value: number) => void;
  setValues: (values: { [key: string]: string }) => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const InputMaterial = ({
  name,
  title,
  isRequired,
  errors,
  values,
  setValues,
  handleChange,
  setNumberValue,
  ...props
}: InputProps) => {
  const [showMatList, setShowMatList] = useState(false);
  const dispatch = useAppDispatch();
  const { matList } = useAppSelector((state) => state.material);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length !== 0) {
      dispatch(fetchMaterial(e.target.value));
    } else {
      dispatch(clearMatList());
    }
    handleChange(e);
    console.log('e:', e.target.value);
  };

  const handleClickButton = () => {
    if (showMatList) {
      setShowMatList(false);
    } else {
      dispatch(fetchMaterial(''));
    }
  };

  const handlerMaterialClick = (mat: Material) => {
    setValues({
      ...values,
      [name]: mat.name,
      q: mat.q,
      p: mat.p,
    });
    const qValue = +mat.q;
    const pValue = +mat.p;
    setNumberValue('q', qValue)
    setNumberValue('p', pValue)
    dispatch(clearMatList());
    setShowMatList(false);
  };

  useEffect(() => {
    if (matList.length !== 0) {
      setShowMatList(true);
    }
  }, [matList]);

  return (
    <label className='input'>
      <span className='input__name'>
        {title}
        {isRequired && <span>*</span>}
      </span>
      <div className='input__wrap'>
        <input
          className={`input__field${(errors[name] && ' input__field_type_error') || ''
            }`}
          name={name}
          value={values[name] || ''}
          onChange={onChange}
          {...props}
        />
        <button
          className={`input__arrow${showMatList ? ' input__arrow_active' : ''}`}
          type='button'
          onClick={handleClickButton}
        ></button>
        {showMatList && (
          <ul className={`material ${showMatList ? 'material_active' : ''}`}>
            {matList.map((material, index) => {
              return (
                <li className='material__item' key={index}>
                  <button
                    className='material__button'
                    type='button'
                    onClick={() => handlerMaterialClick(material)}
                  >
                    {material.name}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        <span className='input__error'>{errors[name]}</span>
      </div>
    </label>
  );
};
