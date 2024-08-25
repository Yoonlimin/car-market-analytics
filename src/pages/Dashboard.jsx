import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import CarTable from '../components/CarTable';
import useLocalStorage from "../hooks/useLocalStorage";
import { Link } from 'react-router-dom';
import Navbar from '../components/NavBar';
import PieChart from '../components/PieChart';
import StackedBarChart from '../components/StackedBarChart';
import carsData from '../assets/taladrod-cars.json';

const Dashboard = () => {
  const [highlightedCars, setHighlightedCars] = useLocalStorage(
    "highlightedCars",
    []
  );
  const [selectedBrand, setSelectedBrand] = useState(null);
 
  const handleHighlight = (car) => {
    setHighlightedCars((prev) => {
      const isHighlighted = prev.some(
        (highlightedCar) => highlightedCar.Cid === car.Cid
      );
      if (isHighlighted) {
        // Unhighlight (remove) the car
        return prev.filter((highlightedCar) => highlightedCar.Cid !== car.Cid);
      } else {
        // Highlight (add) the car
        return [...prev, car];
      }
    });
  };
 
  // Group cars by brand and model
  const groupedCars = carsData.Cars.reduce((acc, car) => {
    const brand = car.NameMMT.split(" ")[0]; // Extract brand from NameMMT
    const model = car.Model;
    if (!acc[brand]) {
      acc[brand] = { total: 0, models: {} };
    }
    if (!acc[brand].models[model]) {
      acc[brand].models[model] = { count: 0, value: 0, cars: [] };
    }
    acc[brand].total += 1;
    acc[brand].models[model].count += 1;
    acc[brand].models[model].value += parseInt(car.Prc.replace(/,/g, ""), 10);
    acc[brand].models[model].cars.push(car);
    return acc;
  }, {});
 
  // Prepare data for PieChart
  const pieChartData = Object.keys(groupedCars).reduce((acc, brand) => {
    acc[brand] = groupedCars[brand].total;
    return acc;
  }, {});
 
  // Prepare data for StackedBarChart
  const stackedBarChartData = groupedCars;
 
  // Extract brands
  const brands = [
    ...new Set(carsData.Cars.map((car) => car.NameMMT.split(" ")[0])),
  ];
  const carsByBrand = (brand) =>
    carsData.Cars.filter((car) => car.NameMMT.startsWith(brand));
 
  return (
    <div>
      <Navbar />
 
      <div style={{ padding: "1rem", marginTop: "60px" }}>
        {!selectedBrand && (
          <>
            <h2>Car Distribution by Brand</h2>
            <div>
              <PieChart data={pieChartData} />
            </div>
            <h2>Car Models by Brand</h2>
            <div>
              <StackedBarChart data={stackedBarChartData} />
            </div>
          </>
        )}
        {selectedBrand ? (
          <>
            <div className="container">
              <div className="row align-items-center">
                <div className="col">
                  <h2>{selectedBrand}</h2>
                </div>
                <div className="col-auto">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setSelectedBrand(null)}
                  >
                    Back to Brands
                  </button>
                </div>
              </div>
            </div>
 
            <CarTable
              cars={carsByBrand(selectedBrand)}
              onHighlight={handleHighlight}
              highlightedCars={highlightedCars}
            />
          </>
        ) : (
          <>
            <h1>Select a Brand</h1>
            <ul>
              {brands.map((brand) => (
                <li key={brand}>
                  <button onClick={() => setSelectedBrand(brand)}>
                    {brand}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};
 
export default Dashboard;