import React, { useEffect, useState } from 'react';

import { fetchDensity, setNumberValue, addDensityUnits, setCountValue } from '../../store/densitySlice';
import { useAppDispatch, useAppSelector } from '../../hook';
import { buildParamsDensityObject } from '../../utils/buildParams';
import { DensityResult } from '../../types/data';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { DynamicInputFields } from '../../components/DynamicInputFields';
import { InputNumber } from '../../components/InputNumber';
import { Units } from '../../components/Units';
import { Form } from '../../components/Form';
import './Density.scss';

export const DensityCoverage: React.FC = () => {
  const [result, setResult] = useState<DensityResult | null>(null);

  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    deleteValue
  } = useFormAndValidation();
  const dispatch = useAppDispatch();

  const density = useAppSelector((state) => state.density);

  const newCalculationHandle = () => {
    setResult(null);
    resetForm();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = buildParamsDensityObject(density);
    dispatch(fetchDensity(params));
  };

  useEffect(() => {
    if (density.resultDensity) {
      setResult(density.resultDensity);
    }
  }, [density.resultDensity]);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <section className='density'>
      <div className='wrapper'>
        <div className='density__container'>
          {density.error && (
            <div className='density__result'>
              <p>{density.error}</p>
            </div>
          )}
          {density.loading && (
            <div className='density__result'>
              <p>Считаем...</p>
            </div>
          )}
          {result && !density.error && (
            <div className='density__result'>
              <p>
                Плотность тока:
              </p>
              <span className='density__result-value'>
                {density.resultDensity ? density.resultDensity.j : 'Нет результата в'} А/дм2
              </span>
            </div>
          )}
          <Form
            name='density'
            buttonText='Рассчет!'
            loadingText='Считаем...'
            isLoading={false}
            isValid={isValid}
            onSubmit={handleSubmit}
            handleReset={newCalculationHandle}
          >
            <fieldset className='fieldset fieldset_thin'>
              <p className='fieldset__title'>Сила тока</p>
              <div className="fieldset__wrap">
                <InputNumber
                  setValue={setNumberValue}
                  name='I'
                  errors={errors}
                  values={values}
                  handleChange={handleChange}
                />
                <Units unitKey='units_I' addUnits={addDensityUnits} name='density' />
              </div>
            </fieldset>
            <DynamicInputFields
              stateName='density'
              addUnits={addDensityUnits}
              setNumberValue={setNumberValue}
              setCountValue={setCountValue}
              deleteValue={deleteValue}
              handleChange={handleChange}
              errors={errors}
              values={values}
            />
          </Form>
        </div>
      </div>
    </section>
  );
};
