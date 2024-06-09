import { useState, ChangeEvent } from 'react';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

import { useAppDispatch } from '../../hook';
import { InputNumber } from '../InputNumber';
import { Units } from '../Units';
import './DynamicInputFields.scss'
interface Field {
  id: number;
  name: string;
}

interface DynamicInputFieldsProps {
  stateName: 'density';
  addUnits: ActionCreatorWithPayload<{
    key: string;
    value: {
      [key: string]: string;
    };
  }, 'density/addDensityUnits'>;
  setNumberValue: ActionCreatorWithPayload<{
    key: string;
    value: number | null;
  }, 'density/setNumberValue'>;
  deleteValue: (name: string) => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  errors: Record<string, string>;
  values: Record<string, string>;
}

export const DynamicInputFields = ({
  stateName,
  addUnits,
  setNumberValue,
  deleteValue,
  handleChange,
  errors,
  values
}: DynamicInputFieldsProps) => {
  const [fields, setFields] = useState<Field[]>([{ id: 1, name: 'S1' }]);

  const dispatch = useAppDispatch();

  const handleAddField = () => {
    if (fields.length < 20) {
      setFields([...fields, { id: fields.length + 1, name: `S${fields.length + 1}` }]);
    }
  };

  const handleRemoveField = (id: number, name: string) => {
    deleteValue(name)
    dispatch(setNumberValue({ key: name, value: null }));
    setFields(fields.filter(field => field.id !== id));
  };

  return (
    <div>
      {fields.map(field => (
        <fieldset key={field.id} className='fieldset'>
          <p className='fieldset__title'>{`Площадь ${field.id} детали`}</p>
          <InputNumber
            setValue={setNumberValue}
            name={field.name}
            errors={errors}
            values={values}
            handleChange={handleChange}
          />
          <Units unitKey={`units_${field.name}`} addUnits={addUnits} name={stateName} />
          {(fields.length === field.id && fields.length !== 1) &&
            <button
              className='dynamic-button dynamic-button_delete'
              type='button'
              onClick={() => handleRemoveField(field.id, field.name)}
            >
              X
            </button>}
        </fieldset>
      ))}
      {fields.length < 20 &&
        <button
          className='dynamic-button'
          type='button'
          onClick={handleAddField}
        >
          Добавить деталь
        </button>}
    </div>
  );
};

