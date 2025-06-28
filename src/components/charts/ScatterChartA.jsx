import React, { useEffect, useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import Papa from 'papaparse';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

function ScatterChartA() {
  const [chartData, setChartData] = useState({ datasets: [] });

  useEffect(() => {
    Papa.parse('/shipping_data.csv', {
      download: true,
      header: true,
      complete: (result) => {
        const rawData = result.data;

    
        const allScatterPoints = rawData.map(item => ({
          x: parseFloat(item['weight (kg)']),
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
              label: 'Price vs. Weight (Sampled Data)', 
              data: sampledPoints, 
              backgroundColor: 'rgba(75,192,192,0.6)',
              borderColor: 'rgba(75,192,192,1)',
              pointRadius: 3,
              pointBackgroundColor: 'rgba(75,192,192,1)',
              pointBorderColor: '#fff',
              pointHoverRadius: 5,
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(75,192,192,1)',
            }
          ]
        });
      }
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
            return `${label}: Weight = ${xValue} kg, Price = $${yValue.toFixed(2)}`;
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
          text: 'Weight (kg)',
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
      <h1 className="text-xl font-bold mb-4 dark:text-black" >Price vs. Weight Scatter Plot</h1>
      <Scatter options={options} data={chartData} />
    </div>
  );
}

export default ScatterChartA;