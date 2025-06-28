import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Papa from 'papaparse';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChartD() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    Papa.parse('/shipping_data.csv', {
      download: true,
      header: true,
      complete: (result) => {
        const rawData = result.data;

        const averageLengthByPort = {};

        rawData.forEach(item => {
          const port = item['destination port'];
          const length = parseFloat(item['length (m)']);

          if (port && !isNaN(length)) {
            if (!averageLengthByPort[port]) {
              averageLengthByPort[port] = { totalLength: 0, count: 0 };
            }
            averageLengthByPort[port].totalLength += length;
            averageLengthByPort[port].count++;
          }
        });

        const sortedPorts = Object.keys(averageLengthByPort).sort((a, b) => {
          const avgA = averageLengthByPort[a].count > 0 ? averageLengthByPort[a].totalLength / averageLengthByPort[a].count : 0;
          const avgB = averageLengthByPort[b].count > 0 ? averageLengthByPort[b].totalLength / averageLengthByPort[b].count : 0;
          return avgB - avgA;
        });
        const labels = sortedPorts;
        const dataPoints = sortedPorts.map(port => {
          const data = averageLengthByPort[port];
          return data.count > 0 ? data.totalLength / data.count : 0;
        });

        setChartData({
          labels,
          datasets: [
            {
              label: 'Average Length (m)',
              data: dataPoints,
              backgroundColor: 'rgba(75, 192, 192, 0.8)', 
              borderColor: 'rgba(75, 192, 192, 1)',
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
            label += `${context.parsed.y.toFixed(2)} m`;
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
          text: 'Average Length (m)',
        },
        beginAtZero: true,
      },
    },
  };

  return (
<div className="p-4 bg-white  rounded-xl shadow-md w-full h-full">
      <h1 className="text-xl font-bold mb-2 text-black">Average Length by Destination Port Bar Chart</h1>
      <Bar options={options} data={chartData} />
    </div>
  );
}

export default BarChartD;