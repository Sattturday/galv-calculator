import React from 'react';
import { Link } from 'react-router-dom';

import './Home.scss';

export const Home: React.FC = () => {
  return (
    <section className="home">
      <div className="wrapper">
        <ul className="home__container">
          <li>
            <Link className="home__card" to="/time-coverage">
              <p className="home__title">Расчет времени покрытия</p>
            </Link>
          </li>
          <li>
            <Link className="home__card" to="/thickness-coverage">
              <p className="home__title">Расчет толщины покрытия</p>
            </Link>
          </li>
          <li>
            <Link className="home__card" to="/weight-coverage">
              <p className="home__title">Расчет массы покрытия</p>
            </Link>
          </li>
          <li>
            <Link className="home__card" to="/">
              <p className="home__title">Расчет плотности тока</p>
            </Link>
          </li>
          <li>
            <Link className="home__card" to="/">
              <p className="home__title">Расчет силы тока</p>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};
