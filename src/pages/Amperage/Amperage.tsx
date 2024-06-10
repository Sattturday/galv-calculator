import React, { useEffect, useState } from 'react';

import { fetchAmperage, setNumberValue, addAmperageUnits } from '../../store/amperageSlice';
import { useAppDispatch, useAppSelector } from '../../hook';
import { buildParamsAmperageObject } from '../../utils/buildParams';
import { Amperage, AmperageResult } from '../../types/data';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { DynamicInputFields } from '../../components/DynamicInputFields';
import { InputNumber } from '../../components/InputNumber';
import { Units } from '../../components/Units';
import { Form } from '../../components/Form';
import './Amperage.scss';

export const AmperagePage: React.FC = () => {
  const [result, setResult] = useState<AmperageResult | null>(null);

  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    deleteValue
  } = useFormAndValidation();
  const dispatch = useAppDispatch();

  const amperage = useAppSelector((state) => state.amperage);

  const newCalculationHandle = () => {
    setResult(null);
    resetForm();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = buildParamsAmperageObject(amperage);
    dispatch(fetchAmperage(params));
  };

  useEffect(() => {
    if (amperage.resultAmperage) {
      setResult(amperage.resultAmperage);
    }
  }, [amperage.resultAmperage]);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <section className='amperage'>
      <div className='wrapper'>
        <div className='amperage__container'>
          {amperage.error && (
            <div className='amperage__result'>
              <p>{amperage.error}</p>
            </div>
          )}
          {amperage.loading && (
            <div className='amperage__result'>
              <p>Считаем...</p>
            </div>
          )}
          {result && !amperage.error && (
            <div className='amperage__result'>
              <p>
                Плотность тока:
              </p>
              <span className='amperage__result-value'>
                {amperage.resultAmperage ? amperage.resultAmperage.I : 'Нет результата в'} А
              </span>
            </div>
          )}
          <Form
            name='amperage'
            buttonText='Рассчет!'
            loadingText='Считаем...'
            isLoading={false}
            isValid={isValid}
            onSubmit={handleSubmit}
            handleReset={newCalculationHandle}
          >
            <fieldset className='fieldset fieldset_thin'>
              <p className='fieldset__title'>Плотность тока</p>
              <InputNumber
                setValue={setNumberValue}
                name='j'
                errors={errors}
                values={values}
                handleChange={handleChange}
              />
              <Units unitKey='units_j' addUnits={addAmperageUnits} name='amperage' />
            </fieldset>
            <DynamicInputFields
              stateName='amperage'
              addUnits={addAmperageUnits}
              setNumberValue={setNumberValue}
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
