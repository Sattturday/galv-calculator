import React, { useEffect, useState } from 'react';

import { fetchTime, setCheckbox, setNumberValue } from '../../store/timeSlice';
import { useAppDispatch, useAppSelector } from '../../hook';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { buildParamsObject } from '../../utils/buildParams';
import { InputCheckbox } from '../../components/InputCheckbox';
import { InputMaterial } from '../../components/InputMaterial';
import { buildResult } from '../../utils/buildResult';
import { InputNumber } from '../../components/InputNumber';
import { Units } from '../../components/Units';
import { ITime } from '../../types/data';
import { Form } from '../../components/Form';

import './Time.scss';

export const Time: React.FC = () => {
  const [knownValues, setKnownValues] = useState('none');
  const [result, setResult] = useState('');

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

  const time = useAppSelector((state) => state.time);

  const checkboxHandler = (key: string) => {
    dispatch(setCheckbox(key));
  };

  const newCalculationHandle = () => {
    setResult('');
    resetForm();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = buildParamsObject(time);
    dispatch(fetchTime(params));
  };

  const resetNumberValue = (possibleKeys: string[], time: ITime) => {
    const timeKeys = Object.keys(time.values);
    for (const possibleKey of possibleKeys) {
      let key: keyof ITime | undefined;
      if (timeKeys.includes(possibleKey)) key = possibleKey as keyof ITime;
      if (key !== undefined && time.values[key] !== null) {
        dispatch(setNumberValue({ key: key, value: null }));
        deleteValue(key);
      }
    }
  };

  const showInput = () => {
    if (!time.know_I && !time.know_m) {
      resetNumberValue(['m', 'I', 'S'], time);
      setKnownValues('none');
    } else if (!time.know_I && time.know_m) {
      resetNumberValue(['I', 'h', 'p'], time);
      setKnownValues('only_m');
    } else if (time.know_I && !time.know_m) {
      resetNumberValue(['j', 'p'], time);
      setKnownValues('only_I');
    } else {
      resetNumberValue(['j', 'S', 'h', 'p'], time);
      setKnownValues('all');
    }
  };

  useEffect(() => {
    showInput();
  }, [checkboxHandler]);

  useEffect(() => {
    if (time.resultTime) {
      setResult(buildResult(time.resultTime));
    }
  }, [time.resultTime]);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <section className='time'>
      <div className='wrapper'>
        <div className='time__container'>
          {time.error && (
            <div className='time__result'>
              <p>{time.error}</p>
            </div>
          )}
          {time.loading && (
            <div className='time__result'>
              <p>Считаем...</p>
            </div>
          )}
          {result && !time.error && (
            <div className='time__result'>
              <p>
                Время покрытия: <span>{result}</span>
              </p>
            </div>
          )}
          <Form
            name='time'
            buttonText='Рассчет!'
            loadingText='Считаем...'
            isLoading={false}
            isValid={isValid}
            onSubmit={handleSubmit}
            handleReset={newCalculationHandle}
          >
            <div className='time__wrap'>
              <InputMaterial
                name='material'
                title='Материал покрытия'
                placeholder='Начните вводить текст'
                type='text'
                minLength={1}
                errors={errors}
                values={values}
                setValues={setValues}
                handleChange={handleChange}
              />
              <InputCheckbox
                option={{ name: 'Масса покрытия известна' }}
                isChecked={time.know_m}
                onChange={() => {
                  checkboxHandler('know_m');
                }}
              />
              <InputCheckbox
                option={{ name: 'Сила тока известна' }}
                isChecked={time.know_I}
                onChange={() => {
                  checkboxHandler('know_I');
                }}
              />
            </div>
            {(knownValues === 'only_m' || knownValues === 'none') && (
              <fieldset className='fieldset'>
                <p className='fieldset__title'>Плотность тока</p>
                <InputNumber
                  name='j'
                  errors={errors}
                  values={values}
                  handleChange={handleChange}
                />
                <Units unitKey='units_j' />
              </fieldset>
            )}
            {(knownValues === 'only_I' || knownValues === 'all') && (
              <fieldset className='fieldset'>
                <p className='fieldset__title'>Сила тока</p>
                <InputNumber
                  name='I'
                  errors={errors}
                  values={values}
                  handleChange={handleChange}
                />
                <Units unitKey='units_I' />
              </fieldset>
            )}
            {(knownValues === 'only_I' || knownValues === 'only_m') && (
              <fieldset className='fieldset'>
                <p className='fieldset__title'>Площадь покрытия</p>
                <InputNumber
                  name='S'
                  errors={errors}
                  values={values}
                  handleChange={handleChange}
                />
                <Units unitKey='units_S' />
              </fieldset>
            )}
            {(knownValues === 'only_I' || knownValues === 'none') && (
              <fieldset className='fieldset'>
                <p className='fieldset__title'>Толщина покрытия</p>
                <InputNumber
                  name='h'
                  errors={errors}
                  values={values}
                  handleChange={handleChange}
                />
                <Units unitKey='units_h' />
              </fieldset>
            )}
            {(knownValues === 'only_I' || knownValues === 'none') && (
              <fieldset className='fieldset'>
                <p className='fieldset__title'>Плотность покрытия</p>
                <InputNumber
                  name='p'
                  errors={errors}
                  values={values}
                  handleChange={handleChange}
                />
                <Units unitKey='units_p' />
              </fieldset>
            )}
            {(knownValues === 'only_m' || knownValues === 'all') && (
              <fieldset className='fieldset'>
                <p className='fieldset__title'>Масса покрытия</p>
                <InputNumber
                  name='m'
                  errors={errors}
                  values={values}
                  handleChange={handleChange}
                />
                <Units unitKey='units_m' />
              </fieldset>
            )}
            <fieldset className='fieldset'>
              <p className='fieldset__title'>Электрохимический эквивалент</p>
              <InputNumber
                name='q'
                errors={errors}
                values={values}
                handleChange={handleChange}
              />
              <Units unitKey='units_q' />
            </fieldset>
            <fieldset className='fieldset'>
              <p className='fieldset__title'>Выход по току</p>
              <InputNumber
                name='wt'
                errors={errors}
                values={values}
                handleChange={handleChange}
                placeholder='0.00'
                step='0.01'
                min='0.01'
                max='100'
              />
              <p className='fieldset__percent'>%</p>
            </fieldset>
          </Form>
        </div>
      </div>
    </section>
  );
};
