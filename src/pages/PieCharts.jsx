import React from 'react';
import PieChartA from '../components/charts/PieChartA';
import PieChartC from '../components/charts/PieChartC';

function PieCharts() {
  return (
    <div className="flex flex-col h-screen w-full mt-16 bg-gray-100 dark:bg-gray-900 p-2 sm:p-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 dark:text-white text-black">
        Pie Charts
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center justify-items-center">
        <PieChartA />
        <PieChartC />
      </div>
    </div>
  );
}

export default PieCharts;
