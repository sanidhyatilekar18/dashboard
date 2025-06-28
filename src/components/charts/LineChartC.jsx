import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Papa from 'papaparse';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function LineChartC() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    Papa.parse('/shipping_data.csv', {
      download: true,
      header: true,
      complete: (result) => {
        const rawData = result.data;

        const dailyShipmentCount = {};

        rawData.forEach(item => {
          const date = item['shipment date'];
          if (date) {
            if (!dailyShipmentCount[date]) {
              dailyShipmentCount[date] = 0;
            }
            dailyShipmentCount[date]++;
          }
        });

        // Sort dates
        const sortedDates = Object.keys(dailyShipmentCount).sort();
        const shipmentCounts = sortedDates.map(date => dailyShipmentCount[date]);

        setChartData({
          labels: sortedDates,
          datasets: [
            {
              label: 'Number of Shipments',
              data: shipmentCounts,
              borderColor: 'rgb(54, 162, 235)',
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              tension: 0.1,
              fill: false,
              pointRadius: 3,
              pointBackgroundColor: 'rgb(54, 162, 235)',
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
            return `${label}: ${yValue} shipments`;
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
          text: 'Count',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-bold mb-2 dark:text-black">Number of Shipments </h1>
      <Line options={options} data={chartData} />
    </div>
  );
}

export default LineChartC;