import React from 'react';
import ScatterChartA from '../components/charts/ScatterChartA';
import ScatterChartB from '../components/charts/ScatterChartB';
import ScatterChartC from '../components/charts/ScatterChartC';

function ScatterCharts() {
  return (
    <div className="flex flex-col h-screen w-full mt-16 bg-gray-100 dark:bg-gray-900 p-2 sm:p-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 dark:text-white text-black">
        Scatter Charts
      </h1>

      <div className="flex flex-col gap-10">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-items-center w-full">
          <ScatterChartA />
          <ScatterChartB />
        </div>

        
      </div>
    </div>
  );
}

export default ScatterCharts;
