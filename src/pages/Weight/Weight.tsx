import React, { useEffect, useState } from 'react';

import { fetchWeight, setCheckbox, setNumberValue, addWeightUnits } from '../../store/weightSlice';
import { useAppDispatch, useAppSelector } from '../../hook';
import { Weight, WeightResult } from '../../types/data';
import { buildParamsWeightObject } from '../../utils/buildParams';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { InputMaterial } from '../../components/InputMaterial';
import { InputCheckbox } from '../../components/InputCheckbox';
import { InputNumber } from '../../components/InputNumber';
import { Units } from '../../components/Units';
import { Form } from '../../components/Form';
import './Weight.scss';

export const WeightCoverage: React.FC = () => {
  const [knownValues, setKnownValues] = useState('none');
  const [result, setResult] = useState<WeightResult | null>(null);

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

  const weight = useAppSelector((state) => state.weight);

  const checkboxHandler = (key: string) => {
    dispatch(setCheckbox(key));
  };

  const newCalculationHandle = () => {
    setResult(null);
    resetForm();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = buildParamsWeightObject(weight);
    dispatch(fetchWeight(params));
  };

  const setMaterialValue = (key: string, value: number) => {
    dispatch(setNumberValue({ key, value }));
  }

  const resetNumberValue = (possibleKeys: string[], weight: Weight) => {
    const weightKeys = Object.keys(weight.values);
    for (const possibleKey of possibleKeys) {
      let key: keyof Weight | undefined;
      if (weightKeys.includes(possibleKey)) key = possibleKey as keyof Weight;
      if (key !== undefined && weight.values[key] !== null) {
        dispatch(setNumberValue({ key: key, value: null }));
        deleteValue(key);
      }
    }
  };

  const showInput = () => { // 't', 'I', 'q', 'wt', 'S', 'j', 'p', 'h'
    if (weight.know_h) {
      resetNumberValue(['t', 'I', 'q', 'wt', 'j'], weight); // 'S', 'p', 'h'
      setKnownValues('know_h');
    } else if (!weight.know_h && weight.know_I) {
      resetNumberValue(['S', 'j', 'p', 'h'], weight); // 't', 'I', 'q', 'wt'
      setKnownValues('know_I');
    } else if (!weight.know_h && !weight.know_I) {
      resetNumberValue(['I', 'p', 'h'], weight); // 't', 'q', 'wt', 'S', 'j'
      setKnownValues('none');
    }
  };

  useEffect(() => {
    showInput();
  }, [checkboxHandler]);

  useEffect(() => {
    if (weight.resultWeight) {
      setResult(weight.resultWeight);
    }
  }, [weight.resultWeight]);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <section className='weight'>
      <div className='wrapper'>
        <div className='weight__container'>
          {weight.error && (
            <div className='weight__result'>
              <p>{weight.error}</p>
            </div>
          )}
          {weight.loading && (
            <div className='weight__result'>
              <p>Считаем...</p>
            </div>
          )}
          {result && !weight.error && (
            <div className='time__result'>
              <p>
                Масса покрытия: <span>{result.m} мг</span>
              </p>
            </div>
          )}
          <Form
            name='weight'
            buttonText='Рассчет!'
            loadingText='Считаем...'
            isLoading={false}
            isValid={isValid}
            onSubmit={handleSubmit}
            handleReset={newCalculationHandle}
          >
            <div className='weight__wrap'>
              <InputMaterial
                name='weightMaterial'
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
                option={{ name: 'Толщина покрытия известна' }}
                isChecked={weight.know_h}
                onChange={() => {
                  checkboxHandler('know_h');
                }}
              />
              {knownValues !== 'know_h' && (<InputCheckbox
                option={{ name: 'Сила тока известна' }}
                isChecked={weight.know_I}
                onChange={() => {
                  checkboxHandler('know_I');
                }}
              />)}
            </div>
            {knownValues === 'none' && (
              <fieldset className='fieldset'>
                <p className='fieldset__title'>Плотность тока</p>
                <InputNumber
                  setValue={setNumberValue}
                  name='j'
                  errors={errors}
                  values={values}
                  handleChange={handleChange}
                />
                <Units unitKey='units_j' addUnits={addWeightUnits} name='weight' />
              </fieldset>
            )}
            {(knownValues === 'know_h' || knownValues === 'none') && (
              <fieldset className='fieldset'>
                <p className='fieldset__title'>Площадь покрытия</p>
                <InputNumber
                  setValue={setNumberValue}
                  name='S'
                  errors={errors}
                  values={values}
                  handleChange={handleChange}
                />
                <Units unitKey='units_S' addUnits={addWeightUnits} name='weight' />
              </fieldset>
            )}
            {knownValues === 'know_h' && (<fieldset className='fieldset'>
              <p className='fieldset__title'>Плотность покрытия</p>
              <InputNumber
                setValue={setNumberValue}
                name='p'
                errors={errors}
                values={values}
                handleChange={handleChange}
              />
              <Units unitKey='units_p' addUnits={addWeightUnits} name='weight' />
            </fieldset>)}
            {knownValues === 'know_h' && (
              <fieldset className='fieldset'>
                <p className='fieldset__title'>Толщина покрытия</p>
                <InputNumber
                  setValue={setNumberValue}
                  name='h'
                  errors={errors}
                  values={values}
                  handleChange={handleChange}
                />
                <Units unitKey='units_h' addUnits={addWeightUnits} name='weight' />
              </fieldset>
            )}
            {knownValues === 'know_I' && (
              <fieldset className='fieldset'>
                <p className='fieldset__title'>Сила тока</p>
                <InputNumber
                  setValue={setNumberValue}
                  name='I'
                  errors={errors}
                  values={values}
                  handleChange={handleChange}
                />
                <Units unitKey='units_I' addUnits={addWeightUnits} name='weight' />
              </fieldset>
            )}
            {(knownValues === 'know_I' || knownValues === 'none') && (
              <fieldset className='fieldset'>
                <p className='fieldset__title'>Время покрытия</p>
                <InputNumber
                  setValue={setNumberValue}
                  name='t'
                  errors={errors}
                  values={values}
                  handleChange={handleChange}
                />
                <Units unitKey='units_t' addUnits={addWeightUnits} name='weight' />
              </fieldset>
            )}
            {(knownValues === 'know_I' || knownValues === 'none') && (
              <fieldset className='fieldset'>
                <p className='fieldset__title'>Электрохимический эквивалент</p>
                <InputNumber
                  setValue={setNumberValue}
                  name='q'
                  errors={errors}
                  values={values}
                  handleChange={handleChange}
                />
                <Units unitKey='units_q' addUnits={addWeightUnits} name='weight' />
              </fieldset>
            )}
            {(knownValues === 'know_I' || knownValues === 'none') && (
              <fieldset className='fieldset'>
                <p className='fieldset__title'>Выход по току</p>
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
                <p className='fieldset__percent'>%</p>
              </fieldset>
            )}
          </Form>
        </div>
      </div>
    </section>
  );
};
