import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Papa from 'papaparse';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function LineChartD() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    Papa.parse('/shipping_data.csv', {
      download: true,
      header: true,
      complete: (result) => {
        const rawData = result.data;

        const dailyLengthData = {}; 

        rawData.forEach(item => {
          const date = item['shipment date'];
          const length = parseFloat(item['length (m)']);

          if (date && !isNaN(length)) {
            if (!dailyLengthData[date]) {
              dailyLengthData[date] = { totalLength: 0, count: 0 };
            }
            dailyLengthData[date].totalLength += length;
            dailyLengthData[date].count++;
          }
        });

        const sortedDates = Object.keys(dailyLengthData).sort();
        const averageLengths = sortedDates.map(date => {
          const data = dailyLengthData[date];
          return data.count > 0 ? data.totalLength / data.count : 0;
        });

        setChartData({
          labels: sortedDates,
          datasets: [
            {
              label: 'Average Shipment Length (m)',
              data: averageLengths,
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
              tension: 0.1,
              fill: false,
              pointRadius: 3,
              pointBackgroundColor: 'rgb(75, 192, 192)',
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
            return `${label}: ${yValue.toFixed(2)} m`;
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
          text: 'Average Length (m)',
        },
        beginAtZero: true,
      },
    },
  };

  return (
   <div className="p-4 bg-white rounded-xl shadow-md w-full">
      <h1 className="text-xl font-bold mb-2 dark:text-black">Average Length of Shipments </h1>
      <Line options={options} data={chartData} />
    </div>
  );
}

export default LineChartD;