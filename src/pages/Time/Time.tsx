import React, { useEffect } from 'react';

import { Form } from '../../components/Form';
import { Input } from '../../components/Input';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { Units } from '../../components/Units';
import { InputNumber } from '../../components/InputNumber';

import './Time.scss';

export const Time: React.FC = () => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log('values:', values);
    resetForm();
  }

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
            <Input
              name="m"
              title="Материал покрытия"
              placeholder="Начните вводить текст"
              type="text"
              minLength={1}
              errors={errors}
              values={values}
              handleChange={handleChange}
            />
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
          </Form>
        </div>
      </div>
    </section>
  );
};
