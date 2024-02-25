import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
