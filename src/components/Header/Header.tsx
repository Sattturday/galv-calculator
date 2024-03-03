import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import './Header.scss';

export const Header: FC = () => {
  return (
    <header className="header">
      <div className="wrapper">
        <nav>
          <ul className="navigation">
            <li className="navigation__box">
              <NavLink
                to="/time-coverage"
                className={({ isActive }) => {
                  return isActive
                    ? 'navigation__item navigation__item_type_active'
                    : 'navigation__item';
                }}
              >
                Расчет времени покрытия
              </NavLink>
            </li>
            <li className="navigation__box">
              <NavLink
                to="/thickness-coverage"
                className={({ isActive }) => {
                  return isActive
                    ? 'navigation__item navigation__item_type_active'
                    : 'navigation__item';
                }}
              >
                Расчет толщины покрытия
              </NavLink>
            </li>
            <li className="navigation__box">
              <NavLink
                to="/mass-coverage"
                className={({ isActive }) => {
                  return isActive
                    ? 'navigation__item navigation__item_type_active'
                    : 'navigation__item';
                }}
              >
                Расчет массы покрытия
              </NavLink>
            </li>
            <li className="navigation__box">
              <NavLink
                to="/current-density"
                className={({ isActive }) => {
                  return isActive
                    ? 'navigation__item navigation__item_type_active'
                    : 'navigation__item';
                }}
              >
                Расчет плотности тока
              </NavLink>
            </li>
            <li className="navigation__box">
              <NavLink
                to="/current-force"
                className={({ isActive }) => {
                  return isActive
                    ? 'navigation__item navigation__item_type_active'
                    : 'navigation__item';
                }}
              >
                Расчет силы тока
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
