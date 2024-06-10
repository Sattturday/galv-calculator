import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { TimeCoverage } from './pages/Time';
import { WeightCoverage } from './pages/Weight';
import { DensityCoverage } from './pages/Density';
import { AmperagePage } from './pages/Amperage';
import { ThicknessCoverage } from './pages/Thickness';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/time-coverage" element={<TimeCoverage />} />
          <Route path="/thickness-coverage" element={<ThicknessCoverage />} />
          <Route path="/weight-coverage" element={<WeightCoverage />} />
          <Route path="/current-density" element={<DensityCoverage />} />
          <Route path="/amperage" element={<AmperagePage />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
