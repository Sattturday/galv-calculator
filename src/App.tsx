import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Time } from './pages/Time';
import { Thickness } from './pages/Thickness';
import { Mass } from './pages/Mass';
import { Density } from './pages/Density';
import { Force } from './pages/Force';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/time-coverage" element={<Time />} />
          <Route path="/thickness-coverage" element={<Thickness />} />
          <Route path="/mass-coverage" element={<Mass />} />
          <Route path="/current-density" element={<Density />} />
          <Route path="/current-force" element={<Force />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
