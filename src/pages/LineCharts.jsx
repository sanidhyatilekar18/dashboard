import React from 'react';
import LineChartA from '../components/charts/LineChartA';
import LineChartB from '../components/charts/LineChartB';
import LineChartC from '../components/charts/LineChartC';
import LineChartD from '../components/charts/LineChartD';

function LineCharts() {
  return (
    <div className="flex flex-col h-screen w-full mt-15 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-2 dark:text-white text-black">Line Charts</h1>

      <div className="flex flex-col gap-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 mt-10 gap-8 items-center justify-items-center">
          <LineChartA />
          <LineChartB />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center justify-items-center">
          <LineChartC />
          <LineChartD />
        </div>
      </div>
    </div>
  );
}

export default LineCharts;
