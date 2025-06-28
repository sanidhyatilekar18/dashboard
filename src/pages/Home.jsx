import React from 'react';
import KPICard from '../components/homecomponents/KPICard';
import RecentOrdersTable from '../components/homecomponents/RecentOrdersTable';
import SalesTrendChart from '../components/homecomponents/SalesTrendChart';

function Home() {
  const kpiData = {
    totalOrders: { value: 542, period: 'This Week', trend: 12 },
    newCustomers: { value: 1280, period: 'This Month', trend: 8 },
    revenue: { value: 15000, period: 'This Month', trend: 10, isCurrency: true },
    activeEmployees: { value: 75, period: 'Currently Active', trend: 0 },
  };

  const recentOrders = [
    { id: '#ORD12345', customer: 'Alice Smith', date: 'Jun 27, 2025', amount: 125.50, status: 'Shipped' },
    { id: '#ORD12344', customer: 'Bob Johnson', date: 'Jun 26, 2025', amount: 300.00, status: 'Processing' },
    { id: '#ORD12343', customer: 'Charlie Brown', date: 'Jun 26, 2025', amount: 45.75, status: 'Delivered' },
    { id: '#ORD12342', customer: 'Diana Prince', date: 'Jun 25, 2025', amount: 89.99, status: 'Shipped' },
    { id: '#ORD12341', customer: 'Clark Kent', date: 'Jun 25, 2025', amount: 210.00, status: 'Delivered' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100  sm:mt-10 dark:bg-gray-900 text-black dark:text-white mt-12 py-6 sm:max-w-screen px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-3xl font-bold text-black dark:text-white mb-6 ">Overview Dashboard</h1>
        <div className="flex items-center space-x-2">
          <label htmlFor="date-filter" className="text-gray-700 text-sm font-medium dark:text-white">View:</label>
          <select
            id="date-filter"
            className="p-2 border border-gray-300 dark:border-gray-600 dark:bg-white dark:text-black rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="today">Today</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="this_month">This Month</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 justify-evenly">
        <KPICard
          title="Total Orders"
          value={kpiData.totalOrders.value}
          period={kpiData.totalOrders.period}
          trend={kpiData.totalOrders.trend}
          icon="🛒"
        />
        <KPICard
          title="New Customers"
          value={kpiData.newCustomers.value}
          period={kpiData.newCustomers.period}
          trend={kpiData.newCustomers.trend}
          icon="👥"
        />
        <KPICard
          title="Active Employees"
          value={kpiData.activeEmployees.value}
          period={kpiData.activeEmployees.period}
          trend={kpiData.activeEmployees.trend}
          icon="👨‍💼"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Sales Trend (Last 30 Days)</h2>
          <SalesTrendChart />
        </div>
       
      <div className="grid grid-cols-1">
        <RecentOrdersTable orders={recentOrders} />
      </div>
    </div>
      </div>
  );
};

export default Home;
