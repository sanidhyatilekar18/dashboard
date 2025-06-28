import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Papa from 'papaparse';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChartA() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    Papa.parse('/shipping_data.csv', {
      download: true,
      header: true,
      complete: (result) => {
        const rawData = result.data;

        const dataByPort = rawData.reduce((acc, item) => {
          const port = item['destination port'];
          const price = parseFloat(item['price ($)']);

          if (port && !isNaN(price)) {
            if (!acc[port]) {
              acc[port] = { sum: 0, count: 0 };
            }
            acc[port].sum += price;
            acc[port].count += 1;
          }
          return acc;
        }, {});

       
        const sortedPorts = Object.keys(dataByPort).sort();
        const labels = sortedPorts;
        const dataPoints = sortedPorts.map(port => dataByPort[port].sum / dataByPort[port].count); 

        setChartData({
          labels,
          datasets: [
            {
              label: 'Average Price by Destination Port',
              data: dataPoints,
             
              backgroundColor: 'rgba(75,192,192,0.6)',
              borderColor: 'rgba(75,192,192,1)', 
              borderWidth: 1 
            }
          ]
        });
      }
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Destination Port'
        }
      },
      y: {
        beginAtZero: true, 
        title: {
          display: true,
          text: 'Average Price ($)'
        }
      }
    }
  };

  return (
<div className="p-4 bg-white rounded-xl shadow-md w-full h-full">
      <h1 className="text-xl font-bold mb-2 text-black">Average Price by Destination Port</h1>
      <Bar options={options} data={chartData} />
    </div>
  );
}

export default BarChartA;