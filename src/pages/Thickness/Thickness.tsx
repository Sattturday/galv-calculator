import React, { useEffect, useState } from 'react';

import { fetchThickness, setCheckbox, setNumberValue, addThicknessUnits } from '../../store/thicknessSlice';
import { useAppDispatch, useAppSelector } from '../../hook';
import { Thickness, ThicknessResult } from '../../types/data';
import { buildParamsThicknessObject } from '../../utils/buildParams';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { InputMaterial } from '../../components/InputMaterial';
import { InputCheckbox } from '../../components/InputCheckbox';
import { InputNumber } from '../../components/InputNumber';
import { Units } from '../../components/Units';
import { Form } from '../../components/Form';
import './Thickness.scss';

export const ThicknessCoverage: React.FC = () => {
  const [knownValues, setKnownValues] = useState('none');
  const [result, setResult] = useState<ThicknessResult | null>(null);

  const {
    values,
    setValues,
    deleteValue,
    handleChange,
    errors,
    isValid,
    resetForm,
  } = useFormAndValidation();
  const dispatch = useAppDispatch();

  const thickness = useAppSelector((state) => state.thickness);

  const checkboxHandler = (key: string) => {
    dispatch(setCheckbox(key));
  };

  const newCalculationHandle = () => {
    setResult(null);
    resetForm();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = buildParamsThicknessObject(thickness);
    dispatch(fetchThickness(params));
  };

  const setMaterialValue = (key: string, value: number) => {
    dispatch(setNumberValue({ key, value }));
  }

  const resetNumberValue = (possibleKeys: string[], thickness: Thickness) => {
    const thicknessKeys = Object.keys(thickness.values);
    for (const possibleKey of possibleKeys) {
      let key: keyof Thickness | undefined;
      if (thicknessKeys.includes(possibleKey)) key = possibleKey as keyof Thickness;
      if (key !== undefined && thickness.values[key] !== null) {
        dispatch(setNumberValue({ key: key, value: null }));
        deleteValue(key);
      }
    }
  };

  const showInput = () => {
    if (thickness.know_m) {
      resetNumberValue(['j', 'I', 't', 'q', 'wt'], thickness);
      setKnownValues('know_m');
    } else if (!thickness.know_m && thickness.know_j) {
      resetNumberValue(['I', 'S', 'm'], thickness);
      setKnownValues('know_j');
    } else if (!thickness.know_m && !thickness.know_j) {
      resetNumberValue(['j', 'm'], thickness);
      setKnownValues('none');
    }
  };

  useEffect(() => {
    showInput();
  }, [checkboxHandler]);

  useEffect(() => {
    if (thickness.resultThickness) {
      setResult(thickness.resultThickness);
    }
  }, [thickness.resultThickness]);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <section className='thickness'>
      <div className='wrapper'>
        <div className='thickness__container'>
          {thickness.error && (
            <div className='thickness__result'>
              <p>{thickness.error}</p>
            </div>
          )}
          {thickness.loading && (
            <div className='thickness__result'>
              <p>Считаем...</p>
            </div>
          )}
          {result && !thickness.error && (
            <div className='thickness__result'>
              <p>
                Толщина покрытия:
              </p>
              <div className="thickness__result-wrap">
                <span className='thickness__result-value'>
                  {
                    thickness.units.units_result.id === 'mkm'
                      ? result.h
                      : thickness.units.units_result.id === 'mm'
                        ? result.h / 1000
                        : result.h / 1000000
                  }
                </span>
                <Units unitKey='units_result' addUnits={addThicknessUnits} name='thickness' />
              </div>
            </div>
          )}
          <Form
            name='thickness'
            buttonText='Рассчет!'
            loadingText='Считаем...'
            isLoading={false}
            isValid={isValid}
            onSubmit={handleSubmit}
            handleReset={newCalculationHandle}
          >
            <div className='thickness__wrap'>
              <InputMaterial
                name='thicknessMaterial'
                title='Материал покрытия'
                placeholder='Начните вводить текст'
                type='text'
                minLength={1}
                errors={errors}
                values={values}
                setValues={setValues}
                handleChange={handleChange}
                setNumberValue={setMaterialValue}
              />
              <InputCheckbox
                option={{ name: 'Масса покрытия известна' }}
                isChecked={thickness.know_m}
                onChange={() => {
                  checkboxHandler('know_m');
                }}
              />
              {knownValues !== 'know_m' && (<InputCheckbox
                option={{ name: 'Плотность тока известна' }}
                isChecked={thickness.know_j}
                onChange={() => {
                  checkboxHandler('know_j');
                }}
              />)}
            </div>
            {(knownValues !== 'know_m' && knownValues === 'know_j') && (
              <fieldset className='fieldset'>
                <p className='fieldset__title'>Плотность тока</p>
                <div className="fieldset__wrap">
                  <InputNumber
                    setValue={setNumberValue}
                    name='j'
                    errors={errors}
                    values={values}
                    handleChange={handleChange}
                  />
                  <Units unitKey='units_j' addUnits={addThicknessUnits} name='thickness' />
                </div>
              </fieldset>
            )}
            {knownValues === 'none' && (
              <fieldset className='fieldset'>
                <p className='fieldset__title'>Сила тока</p>
                <div className="fieldset__wrap">
                  <InputNumber
                    setValue={setNumberValue}
                    name='I'
                    errors={errors}
                    values={values}
                    handleChange={handleChange}
                  />
                  <Units unitKey='units_I' addUnits={addThicknessUnits} name='thickness' />
                </div>
              </fieldset>
            )}
            {knownValues !== 'know_j' && (
              <fieldset className='fieldset'>
                <p className='fieldset__title'>Площадь покрытия</p>
                <div className="fieldset__wrap">
                  <InputNumber
                    setValue={setNumberValue}
                    name='S'
                    errors={errors}
                    values={values}
                    handleChange={handleChange}
                  />
                  <Units unitKey='units_S' addUnits={addThicknessUnits} name='thickness' />
                </div>
              </fieldset>
            )}
            {(knownValues === 'know_j' || knownValues === 'none') && (
              <fieldset className='fieldset'>
                <p className='fieldset__title'>Время покрытия</p>
                <div className="fieldset__wrap">
                  <InputNumber
                    setValue={setNumberValue}
                    name='t'
                    errors={errors}
                    values={values}
                    handleChange={handleChange}
                  />
                  <Units unitKey='units_t' addUnits={addThicknessUnits} name='thickness' />
                </div>
              </fieldset>
            )}
            {(knownValues === 'know_j' || knownValues === 'none') && (
              <fieldset className='fieldset'>
                <p className='fieldset__title'>Электрохимический эквивалент</p>
                <div className="fieldset__wrap">
                  <InputNumber
                    setValue={setNumberValue}
                    name='q'
                    errors={errors}
                    values={values}
                    handleChange={handleChange}
                  />
                  <Units unitKey='units_q' addUnits={addThicknessUnits} name='thickness' />
                </div>
              </fieldset>
            )}
            {(knownValues === 'know_j' || knownValues === 'none') && (
              <fieldset className='fieldset'>
                <p className='fieldset__title'>Выход по току</p>
                <div className="fieldset__wrap">
                  <InputNumber
                    setValue={setNumberValue}
                    name='wt'
                    errors={errors}
                    values={values}
                    handleChange={handleChange}
                    placeholder='0.00'
                    step='0.01'
                    min='0.01'
                    max='100'
                  />
                  <p className='fieldset__text'>%</p>
                </div>
              </fieldset>
            )}

            <fieldset className='fieldset'>
              <p className='fieldset__title'>Плотность покрытия</p>
              <div className="fieldset__wrap">
                <InputNumber
                  setValue={setNumberValue}
                  name='p'
                  errors={errors}
                  values={values}
                  handleChange={handleChange}
                />
                <Units unitKey='units_p' addUnits={addThicknessUnits} name='thickness' />
              </div>
            </fieldset>

            {knownValues === 'know_m' && (
              <fieldset className='fieldset'>
                <p className='fieldset__title'>Масса покрытия</p>
                <div className="fieldset__wrap">
                  <InputNumber
                    setValue={setNumberValue}
                    name='m'
                    errors={errors}
                    values={values}
                    handleChange={handleChange}
                  />
                  <Units unitKey='units_m' addUnits={addThicknessUnits} name='thickness' />
                </div>
              </fieldset>
            )}
          </Form>
        </div>
      </div>
    </section>
  );
};
