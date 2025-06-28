import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Papa from 'papaparse';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChartB() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    Papa.parse('/shipping_data.csv', {
      download: true,
      header: true,
      complete: (result) => {
        const rawData = result.data;

        const totalWeightByPort = {};

        rawData.forEach(item => {
          const port = item['destination port'];
          const weight = parseFloat(item['weight (kg)']);

          if (port && !isNaN(weight)) {
            if (!totalWeightByPort[port]) {
              totalWeightByPort[port] = 0;
            }
            totalWeightByPort[port] += weight;
          }
        });

        const sortedPorts = Object.keys(totalWeightByPort).sort((a, b) => totalWeightByPort[b] - totalWeightByPort[a]);
        const labels = sortedPorts;
        const dataPoints = sortedPorts.map(port => totalWeightByPort[port]);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Total Weight (kg)',
              data: dataPoints,
              backgroundColor: 'rgba(255, 159, 64, 0.8)', 
              borderColor: 'rgba(255, 159, 64, 1)',
              borderWidth: 1,
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
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += `${context.parsed.y.toFixed(2)} kg`;
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Destination Port',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Total Weight (kg)',
        },
        beginAtZero: true,
      },
    },
  };

  return (
<div className="p-4 bg-white shadow-md w-full h-full">
      <h1 className='text-xl font-bold mb-2 text-black'>Total Weight by Destination Port Bar Chart</h1>
      <Bar options={options} data={chartData} />
    </div>
  );
}

export default BarChartB;