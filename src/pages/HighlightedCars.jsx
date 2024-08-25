import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import CarTable from '../components/CarTable';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import styles from './HighlightedCars.module.css';

const HighlightedCars = () => {
  const [highlightedCars, setHighlightedCars] = useLocalStorage('highlightedCars', []);

  const handleHighlight = (newCar) => {
    setHighlightedCars((prevCars) => {
      const isCarHighlighted = prevCars.some(car => car.Cid === newCar.Cid);
      if (isCarHighlighted) {
        return prevCars.filter(car => car.Cid !== newCar.Cid); // Unhighlight the car
      } else {
        return [...prevCars, newCar]; // Highlight the car
      }
    });
  };

  const handleUnhighlightAll = () => {
    setHighlightedCars([]); // Unhighlight all cars
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.titleRow}>
          <h1>Highlighted Cars</h1>
          {highlightedCars.length > 0 && (
            <button
              className='btn btn-secondary'
              onClick={handleUnhighlightAll}
            >
              Unhighlight All
            </button>
          )}
        </div>
        {highlightedCars.length > 0 ? (
          <div className={styles.tableContainer}>
            <CarTable
              cars={highlightedCars}
              onHighlight={handleHighlight}
              highlightedCars={highlightedCars}
            />
          </div>
        ) : (
          <p>There are no cars that has been highlighted. Start highlighting cars from the Dashboard.</p>
        )}
        <Link to="/">Back to Dashboard</Link>
      </div>
    </div>
  );
};

export default HighlightedCars;