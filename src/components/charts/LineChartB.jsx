import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Papa from 'papaparse';
import LineChartC from './LineChartC';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function LineChartB() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    Papa.parse('/shipping_data.csv', {
      download: true,
      header: true,
      complete: (result) => {
        const rawData = result.data;

        const dailyWeight = {};

        rawData.forEach(item => {
          const date = item['shipment date'];
          const weight = parseFloat(item['weight (kg)']);

          if (date && !isNaN(weight)) {
            if (!dailyWeight[date]) {
              dailyWeight[date] = 0;
            }
            dailyWeight[date] += weight;
          }
        });

        const sortedDates = Object.keys(dailyWeight).sort();
        const totalWeights = sortedDates.map(date => dailyWeight[date]);

        setChartData({
          labels: sortedDates,
          datasets: [
            {
              label: 'Total Weight Shipped (kg)',
              data: totalWeights,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              tension: 0.1,
              fill: false, 
              pointRadius: 3,
              pointBackgroundColor: 'rgb(255, 99, 132)',
              pointBorderColor: '#fff',
              pointHoverRadius: 5,
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
            const yValue = context.parsed.y;
            return `${label}: ${yValue.toFixed(2)} kg`;
          }
        }
      }
    },
    scales: {
      x: {
        type: 'category', 
        title: {
          display: true,
          text: 'Shipment Date',
        },
      },
      y: {
        type: 'linear',
        title: {
          display: true,
          text: 'Total Weight (kg)',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full  p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-bold mb-2 dark:text-black">Total Weight Shipped </h1>
      <Line options={options} data={chartData} />
    </div>
  );
}

export default LineChartB;