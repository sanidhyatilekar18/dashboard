import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Papa from 'papaparse';

ChartJS.register(ArcElement, Tooltip, Legend);

const backgroundColors = [
  'rgba(255, 99, 132, 0.8)',  
  'rgba(54, 162, 235, 0.8)',  
  'rgba(255, 206, 86, 0.8)',  
  'rgba(75, 192, 192, 0.8)',  
  'rgba(153, 102, 255, 0.8)', 
  'rgba(255, 159, 64, 0.8)',  
  'rgba(199, 199, 199, 0.8)', 
  'rgba(83, 102, 126, 0.8)',  
  'rgba(201, 203, 207, 0.8)', 
  'rgba(0, 128, 0, 0.8)',     
  'rgba(255, 0, 0, 0.8)',     
  'rgba(0, 0, 255, 0.8)'      
];

function PieChartC() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [error, setError] = useState(null); 

  useEffect(() => {
    const revenueByProduct = {};

    setError(null); 

    Papa.parse('/shipping_data.csv', {
      download: true,
      header: true,
      skipEmptyLines: true, 
      step: (row, parser) => {
        const item = row.data;
        const product = item['name'];
        const price = parseFloat(item['price ($)']);

        if (product && !isNaN(price)) {
          revenueByProduct[product] = (revenueByProduct[product] || 0) + price;
        } else if (!product) {
          console.warn("Skipping row due to missing product name:", item);
        } else if (isNaN(price)) {
          console.warn(`Skipping row due to invalid price for product "${product}": "${item['price ($)']}"`);
        }
      },
      complete: () => {
        const labels = Object.keys(revenueByProduct).sort();
        const dataPoints = labels.map(product => revenueByProduct[product]);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Revenue by Product',
              data: dataPoints,
              backgroundColor: backgroundColors,
              borderColor: 'rgba(255, 255, 255, 1)',
              borderWidth: 1,
            },
          ],
        });
      },
      error: (err) => {
        console.error("Error parsing CSV:", err);
        setError("Failed to load shipment data. Please ensure 'shipping_data.csv' exists and is accessible.");
      }
    });
  }, []); 

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, 
        position: 'top',
        labels: {
            boxWidth: 20,
        }
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-2xl w-full max-w-3xl ">
      <h1 className="text-xl font-bold mb-4 dark:text-black">Revenue by Product</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!error && chartData.labels.length > 0 ? (
        <Pie options={options} data={chartData} />
      ) : (
        !error && <p>No product revenue data available to display the chart.</p>
      )}
    </div>
  );
}

export default PieChartC;