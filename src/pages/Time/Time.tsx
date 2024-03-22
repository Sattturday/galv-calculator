import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hook';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { buildParamsObject } from '../../utils/buildParams';
import { InputCheckbox } from '../../components/InputCheckbox';
import { InputMaterial } from '../../components/InputMaterial';
import { InputNumber } from '../../components/InputNumber';
import { fetchTime, setCheckbox } from '../../store/timeSlice';
import { Units } from '../../components/Units';
import { Form } from '../../components/Form';

import './Time.scss';

export const Time: React.FC = () => {
  const [knownValues, setKnownValues] = useState('none');
  const [showResult, setShowResult] = useState(false);

  const { values, setValues, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();
  const dispatch = useAppDispatch();

  const time = useAppSelector(state => state.time);

  const resultHour =
    time.resultTime !== null
      ? time.resultTime.t_hour.toFixed(3)
      : 'Нет результата';
  const resultMin =
    time.resultTime !== null
      ? time.resultTime.t_min.toFixed(3)
      : 'Нет результата';
  const resultSec =
    time.resultTime !== null ? time.resultTime.t.toFixed(3) : 'Нет результата';

  const checkboxHandler = (key: string) => {
    dispatch(setCheckbox(key));
  };

  const newCalculationHandle = () => {
    setShowResult(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = buildParamsObject(time);
    dispatch(fetchTime(params));
    // resetForm();
    setShowResult(true);
  };

  const showInput = () => {
    if (!time.know_I && !time.know_m) {
      setKnownValues('none');
    } else if (time.know_I && !time.know_m) {
      setKnownValues('only_I');
    } else if (!time.know_I && time.know_m) {
      setKnownValues('only_m');
    } else {
      setKnownValues('all');
    }
  };

  useEffect(() => {
    showInput();
  }, [checkboxHandler]);

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
          {showResult ? (
            <div className="time__result">
              <ul className="time__list">
                <li>
                  <p>
                    Время покрытия в часах: <span>{resultHour}</span>
                  </p>
                </li>
                <li>
                  <p>
                    Время покрытия в минутах: <span>{resultMin}</span>
                  </p>
                </li>
                <li>
                  <p>
                    Время покрытия в секундах: <span>{resultSec}</span>
                  </p>
                </li>
              </ul>
              <button className="time__button" onClick={newCalculationHandle}>
                Новый рассчет
              </button>
            </div>
          ) : (
            <Form
              name="time"
              buttonText="Рассчет!"
              loadingText="Считаем..."
              isLoading={false}
              isValid={isValid}
              onSubmit={handleSubmit}
            >
              <div className="time__wrap">
                <InputMaterial
                  name="material"
                  title="Материал покрытия"
                  placeholder="Начните вводить текст"
                  type="text"
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
          )}
        </div>
      </div>
    </section>
  );
};
