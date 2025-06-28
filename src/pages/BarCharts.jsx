import React from 'react';
import BarChartA from '../components/charts/BarChartA';
import BarChartB from '../components/charts/BarChartB';
import BarChartC from '../components/charts/BarChartC';
import BarChartD from '../components/charts/BarChartD';

function BarCharts() {
  return (
    <div className="flex flex-col h-screen w-full mt-16 bg-gray-100 dark:bg-gray-900 p-2 sm:p-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 dark:text-white text-black">
        Bar Charts
      </h1>

      <div className="flex flex-col gap-10">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center justify-items-center">
          <BarChartA />
          <BarChartB />
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center justify-items-center">
          <BarChartC />
          <BarChartD />
        </div>
      </div>
    </div>
  );
}

export default BarCharts;
