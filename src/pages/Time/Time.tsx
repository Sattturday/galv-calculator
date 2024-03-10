import React, { useEffect, useState } from 'react';

import { Form } from '../../components/Form';
import { Input } from '../../components/InputMaterial';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { Units } from '../../components/Units';
import { InputNumber } from '../../components/InputNumber';
import { useAppDispatch, useAppSelector } from '../../hook';
import { setCheckbox } from '../../store/timeSlice';
import { InputCheckbox } from '../../components/InputCheckbox';

import './Time.scss';
import { buildParamsObject } from '../../utils/buildParams';

export const Time: React.FC = () => {
  const [knownValues, setKnownValues] = useState('none');

  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();
  const dispatch = useAppDispatch();

  const time = useAppSelector(state => state.time);
  const { know_m, know_I } = useAppSelector(state => state.time);

  const checkboxHandler = (key: string) => {
    dispatch(setCheckbox(key));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    buildParamsObject(time);
    resetForm();
  };

  const showInput = () => {
    if (!know_I && !know_m) {
      setKnownValues('none');
    } else if (know_I && !know_m) {
      setKnownValues('only_I');
    } else if (!know_I && know_m) {
      setKnownValues('only_m');
    } else {
      setKnownValues('all');
    }
  };

  useEffect(() => {
    showInput();
  }, [checkboxHandler]);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <section className="time">
      <div className="wrapper">
        <div className="time__container">
          <Form
            name="time"
            buttonText="Рассчет!"
            loadingText="Считаем..."
            isLoading={false}
            isValid={isValid}
            onSubmit={handleSubmit}
          >
            <div className="time__wrap">
              <Input
                name="material"
                title="Материал покрытия"
                placeholder="Начните вводить текст"
                type="text"
                minLength={1}
                errors={errors}
                values={values}
                handleChange={handleChange}
              />
              <InputCheckbox
                option={{ name: 'Масса покрытия известна' }}
                isChecked={know_m}
                onChange={() => {
                  checkboxHandler('know_m');
                }}
              />
              <InputCheckbox
                option={{ name: 'Сила тока известна' }}
                isChecked={know_I}
                onChange={() => {
                  checkboxHandler('know_I');
                }}
              />
            </div>
            <fieldset className="fieldset">
              <p className="fieldset__title">Выход по току</p>
              <InputNumber
                name="wt"
                errors={errors}
                values={values}
                handleChange={handleChange}
                placeholder="0,00"
                step="0.01"
                max="100"
              />
              <p className="fieldset__percent">%</p>
            </fieldset>
            <fieldset className="fieldset">
              <p className="fieldset__title">Электрохимический эквивалент</p>
              <InputNumber
                name="q"
                errors={errors}
                values={values}
                handleChange={handleChange}
              />
              <Units unitKey="units_q" />
            </fieldset>
            {(knownValues === 'only_I' || knownValues === 'all') && (
              <fieldset className="fieldset">
                <p className="fieldset__title">Сила тока</p>
                <InputNumber
                  name="I"
                  errors={errors}
                  values={values}
                  handleChange={handleChange}
                />
                <Units unitKey="units_I" />
              </fieldset>
            )}
            {(knownValues === 'only_m' || knownValues === 'all') && (
              <fieldset className="fieldset">
                <p className="fieldset__title">Масса покрытия</p>
                <InputNumber
                  name="m"
                  errors={errors}
                  values={values}
                  handleChange={handleChange}
                />
                <Units unitKey="units_m" />
              </fieldset>
            )}
            {(knownValues === 'only_I' || knownValues === 'only_m') && (
              <fieldset className="fieldset">
                <p className="fieldset__title">Площадь покрытия</p>
                <InputNumber
                  name="S"
                  errors={errors}
                  values={values}
                  handleChange={handleChange}
                />
                <Units unitKey="units_S" />
              </fieldset>
            )}
            {(knownValues === 'only_m' || knownValues === 'none') && (
              <fieldset className="fieldset">
                <p className="fieldset__title">Плотность тока</p>
                <InputNumber
                  name="j"
                  errors={errors}
                  values={values}
                  handleChange={handleChange}
                />
                <Units unitKey="units_j" />
              </fieldset>
            )}
            {(knownValues === 'only_I' || knownValues === 'none') && (
              <fieldset className="fieldset">
                <p className="fieldset__title">Плотность покрытия</p>
                <InputNumber
                  name="p"
                  errors={errors}
                  values={values}
                  handleChange={handleChange}
                />
                <Units unitKey="units_p" />
              </fieldset>
            )}
            {(knownValues === 'only_I' || knownValues === 'none') && (
              <fieldset className="fieldset">
                <p className="fieldset__title">Толщина покрытия</p>
                <InputNumber
                  name="h"
                  errors={errors}
                  values={values}
                  handleChange={handleChange}
                />
                <Units unitKey="units_h" />
              </fieldset>
            )}
          </Form>
        </div>
      </div>
    </section>
  );
};
