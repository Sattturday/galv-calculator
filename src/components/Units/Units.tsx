import { useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hook';
import { useClickOutside } from '../../hooks/useClickOutside';
import { unitsButtons } from '../../utils/data';
import { ITime } from '../../types/data';

import './Units.scss';
import { addTimeUnits } from '../../store/timeSlice';

interface UnitsProps {
  unitKey: keyof ITime;
}

export const Units: React.FC<UnitsProps> = ({ unitKey }) => {
  const units: { [key: string]: string }[] = unitsButtons[unitKey];
  const initialButtonName = useAppSelector(state => state.time[unitKey]);

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
    // sortHandler(e.target.id);
    // Устанавливаем название кнопки в зависимости от выбранной опции
    const selectedButton = units.find(button => button.id === e.target.id);
    if (selectedButton) {
      setButtonName(selectedButton.title);
      // dispatch(addTimeUnits_m(selectedButton.title));
      dispatch(addTimeUnits({ key: unitKey, value: selectedButton.title }));
    }

    onClickNavTab();
  };

  return (
    <div className={`sort${isActive ? ' sort_active' : ''}`} ref={sortRef}>
      <div
        className={`sort__wrapper${isActive ? ' sort__wrapper_active' : ''}`}
      >
        <button className="sort__button" type="button" onClick={onClickNavTab}>
          {buttonName}
          <span className="sort__arrow"></span>
        </button>
      </div>
      <ul className={`sort__list ${isActive ? 'sort__list_active' : ''}`}>
        {units &&
          units.map(button => {
            return (
              <li className="sort__item" key={button.id}>
                <label className="sort__label">
                  <input
                    id={button.id}
                    className="sort__radio"
                    type="radio"
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
