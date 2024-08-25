import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Highlighted from './pages/HighlightedCars';
import useLocalStorage from './hooks/useLocalStorage';

const App = () => {
  const [highlightedCars, setHighlightedCars] = useLocalStorage('highlightedCars', []);

  const handleHighlight = (car) => {
    setHighlightedCars((prevCars) => {
      const index = prevCars.findIndex(c => c.Cid === car.Cid);
      if (index > -1) {
        // Car is already highlighted, remove it
        return prevCars.filter(c => c.Cid !== car.Cid);
      } else {
        // Car is not highlighted, add it
        return [...prevCars, car];
      }
    });
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard highlightedCars={highlightedCars} onHighlight={handleHighlight} />} />
        <Route path="/highlighted" element={<Highlighted highlightedCars={highlightedCars} onHighlight={handleHighlight} />} />
      </Routes>
    </Router>
  );
};

export default App;