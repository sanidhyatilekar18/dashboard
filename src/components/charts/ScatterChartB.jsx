import React, { useEffect, useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import Papa from 'papaparse';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

function ScatterChartB() {
  const [chartData, setChartData] = useState({ datasets: [] });

  useEffect(() => {
    Papa.parse('/shipping_data.csv', {
      download: true,
      header: true,
      complete: (result) => {
        const rawData = result.data;

        const allScatterPoints = rawData.map(item => ({
          x: parseFloat(item['length (m)']), 
          y: parseFloat(item['price ($)'])  
        })).filter(point => !isNaN(point.x) && !isNaN(point.y));

        const maxPoints = 10000;
        let sampledPoints = allScatterPoints;
        if (allScatterPoints.length > maxPoints) {
          sampledPoints = [];
          const totalPoints = allScatterPoints.length;
          for (let i = 0; i < maxPoints; i++) {
            const randomIndex = Math.floor(Math.random() * totalPoints);
            sampledPoints.push(allScatterPoints[randomIndex]);
          }
        }

        setChartData({
          datasets: [
            {
              label: 'Price ($) vs. Length (m) (Sampled Data)',
              data: sampledPoints,
              backgroundColor: 'rgba(255, 99, 132, 0.6)', 
              borderColor: 'rgba(255, 99, 132, 1)',
              pointRadius: 3,
              pointBackgroundColor: 'rgba(255, 99, 132, 1)',
              pointBorderColor: '#fff',
              pointHoverRadius: 5,
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
            },
          ],
        });
      },
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
     
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const xValue = context.parsed.x;
            const yValue = context.parsed.y;
            return `${label}: Length = ${xValue.toFixed(2)} m, Price = $${yValue.toFixed(2)}`;
          }
        }
      }
    },
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'Length (m)',
        },
      },
      y: {
        type: 'linear',
        title: {
          display: true,
          text: 'Price ($)',
        },
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md w-full max-w-3xl ">
      <h1 className="text-xl font-bold mb-4 dark:text-black">Price vs. Length Scatter Plot</h1>
      <Scatter options={options} data={chartData} />
    </div>
  );
}

export default ScatterChartB;