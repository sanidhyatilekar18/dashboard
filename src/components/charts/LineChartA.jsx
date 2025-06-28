import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Papa from 'papaparse';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function LineChartA() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    Papa.parse('/shipping_data.csv', {
      download: true,
      header: true,
      complete: (result) => {
        const rawData = result.data;

        
        const dataByDate = rawData.reduce((acc, item) => {
          const date = item['shipment date'];
          const price = parseFloat(item['price ($)']);

          
          if (date && !isNaN(price)) {
            if (!acc[date]) {
              acc[date] = { sum: 0, count: 0 };
            }
            acc[date].sum += price;
            acc[date].count += 1;
          }
          return acc;
        }, {});

        
        const sortedDates = Object.keys(dataByDate).sort();
        const labels = sortedDates;
        const dataPoints = sortedDates.map(date => dataByDate[date].sum / dataByDate[date].count); 

        setChartData({
          labels,
          datasets: [
            {
              label: 'Average Price by Shipment Date', 
              data: dataPoints,
              fill: false,
              borderColor: 'rgba(75,192,192,1)',
              tension: 0.1 
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
          text: 'Shipment Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Average Price ($)' 
        }
      }
    }
  };

  return (
    <div className="w-full  p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-bold mb-2 dark:text-black">Average Price Trend</h1>
      <Line options={options} data={chartData} />
    </div>
  );
}

export default LineChartA;