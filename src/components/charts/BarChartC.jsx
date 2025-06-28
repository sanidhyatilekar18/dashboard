import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Papa from 'papaparse';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChartC() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    Papa.parse('/shipping_data.csv', {
      download: true,
      header: true,
      complete: (result) => {
        const rawData = result.data;

        const shipmentCountByPort = {};

        rawData.forEach(item => {
          const port = item['destination port'];
          if (port) {
            if (!shipmentCountByPort[port]) {
              shipmentCountByPort[port] = 0;
            }
            shipmentCountByPort[port]++;
          }
        });

        const sortedPorts = Object.keys(shipmentCountByPort).sort((a, b) => shipmentCountByPort[b] - shipmentCountByPort[a]);
        const labels = sortedPorts;
        const dataPoints = sortedPorts.map(port => shipmentCountByPort[port]);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Number of Shipments',
              data: dataPoints,
              backgroundColor: 'rgba(54, 162, 235, 0.8)', 
              borderColor: 'rgba(54, 162, 235, 1)',
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
            label += `${context.parsed.y} shipments`;
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
          text: 'Number of Shipments',
        },
        beginAtZero: true,
      },
    },
  };

  return (
<div className="p-4 bg-white  rounded-xl shadow-md w-full h-full">
      <h1 className="text-xl font-bold mb-2 text-black">Number of Shipments by Destination Port </h1>
      <Bar options={options} data={chartData} />
    </div>
  );
}

export default BarChartC;