
import React from 'react';

function KPICard({ title, value, period, trend, icon, isCurrency }) {
  const formattedValue = isCurrency
    ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value)
    : new Intl.NumberFormat('en-IN').format(value);

  const trendColor = trend > 0 ? 'text-green-500' : trend < 0 ? 'text-red-500' : 'text-gray-500';
  const trendArrow = trend > 0 ? '↑' : trend < 0 ? '↓' : '—';

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-700">{title}</h3>
        <span className="text-3xl">{icon}</span>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-bold text-gray-900 leading-none">{formattedValue}</p>
        <div className="text-right">
          <p className={`text-sm font-semibold ${trendColor}`}>
            {trendArrow} {Math.abs(trend)}%
          </p>
          <p className="text-xs text-gray-500">{period}</p>
        </div>
      </div>
    </div>
  );
}

export default KPICard;