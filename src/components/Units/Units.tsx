import { useRef, useState } from 'react';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

import { hasOwnPropertyFromUnknown } from '../../utils/hasOwnPropertyFromUnknown';
import { useAppDispatch, useAppSelector } from '../../hook';
import { useClickOutside } from '../../hooks/useClickOutside';
import { unitsButtons } from '../../utils/data';
import { Thickness, Time } from '../../types/data';

import './Units.scss';

interface UnitsProps {
  unitKey: keyof Time['units'] | keyof Thickness['units'] | 'result_units';
  addUnits: ActionCreatorWithPayload<{
    key: string;
    value: {
      [key: string]: string;
    };
  }, "time/addTimeUnits" | "thickness/addThicknessUnits" | "thickness/addResultUnits" | "weight/addWeightUnits">;
  name: 'time' | "thickness" | "weight";
}

export const Units: React.FC<UnitsProps> = ({ unitKey, addUnits, name }) => {

  const units: { [key: string]: string }[] = unitsButtons[unitKey];
  const stateUnit = useAppSelector((state) => state[name].units[unitKey]);

  let initialButtonName: string;
  if (
    stateUnit !== null &&
    hasOwnPropertyFromUnknown(stateUnit, 'title') &&
    typeof stateUnit.title === 'string'
  ) {
    initialButtonName = stateUnit.title;
  } else {
    console.error('Error 82a9e109-c16f-46c5-b103-3c80be2aade8');
    initialButtonName = '';
  }

  const [isActive, setIsActive] = useState(false);
  const [buttonName, setButtonName] = useState(initialButtonName);

  const dispatch = useAppDispatch();
  const sortRef = useRef(null);

  useClickOutside(sortRef, () => {
    if (isActive) setTimeout(() => setIsActive(false), 200);
  });

  const onClickNavTab = () => {
    setIsActive(!isActive);
  };

  const onClickUnitHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Устанавливаем название кнопки в зависимости от выбранной опции
    const selectedButton = units.find((button) => button.id === e.target.id);
    if (selectedButton) {
      setButtonName(selectedButton.title);
      dispatch(addUnits({ key: unitKey, value: selectedButton }));
    }

    onClickNavTab();
  };

  return (
    <div className={`sort${isActive ? ' sort_active' : ''}`} ref={sortRef}>
      <div
        className={`sort__wrapper${isActive ? ' sort__wrapper_active' : ''}`}
      >
        <button className='sort__button' type='button' onClick={onClickNavTab}>
          {buttonName}
          <span className='sort__arrow'></span>
        </button>
      </div>
      <ul className={`sort__list ${isActive ? 'sort__list_active' : ''}`}>
        {units &&
          units.map((button) => {
            return (
              <li className='sort__item' key={button.id}>
                <label className='sort__label'>
                  <input
                    id={button.id}
                    className='sort__radio'
                    type='radio'
                    name={button.id}
                    checked={buttonName === button.title}
                    onChange={onClickUnitHandler}
                  />
                  <span>{button.title}</span>
                </label>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
