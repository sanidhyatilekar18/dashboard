import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';
import Papa from 'papaparse';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChartA() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [error, setError] = useState(null); 

  useEffect(() => {
     setError(null);
    Papa.parse('/shipping_data.csv', {
      download: true,
      header: true,
      skipEmptyLines: true, 
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
        const dataPoints = sortedPorts.map(port => dataByPort[port].sum); 

        
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

        setChartData({
          labels,
          datasets: [
            {
              label: 'Total Price by Destination Port',
              data: dataPoints,
              backgroundColor: backgroundColors, 
              borderColor: 'rgba(255, 255, 255, 1)', 
              borderWidth: 1
            }
          ]
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
        labels: {
          boxWidth: 20 
        }
      },
    
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed);
            }
            return label;
          }
        }
      }
    },
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-2xl w-full max-w-3xl ">
          <h1 className="text-xl font-bold mb-4 dark:text-black">Total Destination Price by Port</h1>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {!error && chartData.labels.length > 0 ? (
            <Pie options={options} data={chartData} />
          ) : (
            !error && <p>No data available to display the chart.</p>
          )}
        </div>
  );
}

export default PieChartA;