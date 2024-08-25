// PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChart = ({ data }) => {
  const pieData = {
    labels: Object.keys(data),
    datasets: [{
      data: Object.values(data),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
    }]
  };
  return (
    
      <div>
      
      <div className="p-3">
        <div className="d-flex justify-content-center" style={{ width: "100%", height: "600px" }}>
        <Pie data={pieData} height={400} width={700} />
        </div>
      </div>
    </div>
    
  );

  

 
};

export default PieChart;
