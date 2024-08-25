import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import styles from './CarTable.module.css';
import Navbar from './Navbar';

const CarTable = ({ cars, onHighlight, highlightedCars }) => {
  const handleHighlight = (car) => {
    onHighlight(car);
  };

  const brands = {};
  const models = {};

  cars.forEach(car => {
    if (car.NameMMT && typeof car.NameMMT === 'string') {
      const brand = car.NameMMT.split(' ')[0]; // Extract the brand from NameMMT
      const model = `${car.Model} / ${car.NameMMT}`;
      
      if (!brands[brand]) brands[brand] = 0;
      brands[brand] += parseFloat(car.Prc.replace(/,/g, ''));
      
      if (!models[brand]) models[brand] = {};
      if (!models[brand][model]) models[brand][model] = [];
      models[brand][model].push(car);
    }
  });

  return (
    <div className={styles.tableContainer + ' ' + styles.top}>
      <Navbar/>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Brand</th>
            <th>Model</th>
            <th>Count</th>
            <th>Value (Baht)</th>
            <th>Image</th>
            <th>Highlight</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(models).map(brand =>
            Object.keys(models[brand]).map(model =>
              models[brand][model].map((car, idx) => (
                <tr key={idx}>
                  <td>{brand}</td>
                  <td>{model}</td>
                  <td>{models[brand][model].length}</td>
                  <td>{(brands[brand] / models[brand][model].length).toFixed(2)}</td>
                  <td>
                    <div className={styles.imgContainer}>
                      <img src={car.Img100} alt={model} />
                    </div>
                  </td>
                  <td>
                    <button 
                      onClick={() => handleHighlight(car)} 
                      className={styles.highlightButton}
                    >
                      <FontAwesomeIcon 
                        icon={highlightedCars.some(highlightedCar => highlightedCar.Cid === car.Cid) ? solidStar : regularStar} 
                        style={{ color: highlightedCars.some(highlightedCar => highlightedCar.Cid === car.Cid) ? 'gold' : 'gray' }}
                      />
                    </button>
                  </td>
                </tr>
              ))
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CarTable;