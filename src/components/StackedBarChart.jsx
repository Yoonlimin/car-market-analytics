import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, Container } from "react-bootstrap";
 
// Register necessary components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
 
function StackedBarChart({ data }) {
  // Format the data for the chart
  const brands = Object.keys(data);
  const models = Array.from(
    new Set(brands.flatMap((brand) => Object.keys(data[brand].models)))
  ); // Collect all unique models
 
  const barData = {
    labels: brands,
    datasets: models.map((model, index) => ({
      label: model,
      data: brands.map((brand) => data[brand].models[model]?.count || 0), // Fill with 0 if model does not exist for the brand
      backgroundColor: `hsl(${index * (360 / models.length)}, 70%, 50%)`,
      stack: 'stack1', // Generate a color for each model
    })),
  };
 
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: true,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const brand = context.label || "";
            const model = context.dataset.label || "";
            const value = context.raw || 0;
            return `${brand} - ${model}: ${value}`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Brands",
        },
        ticks: {
          autoSkip: false,
          maxRotation: 90,
          minRotation: 90,
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "Counts",
        },
      },
    },
  };
 
 
  return (
    <Container>
      <div>
      
      <div className="p-3">
        <div className="d-flex justify-content-center" style={{ width: "100%", height: "600px" }}>
        <Bar data={barData} options={options} height={400} width={700} />
        </div>
      </div>
    </div>
    </Container>
  );
}
 
export default StackedBarChart;