import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import Customers from './pages/Customers';
import Employees from './pages/Employees';
import Orders from './pages/Orders';
import Kanban from './pages/Kanban'
import LineCharts from './pages/LineCharts';
import BarCharts from './pages/BarCharts';
import PieCharts from './pages/PieCharts';
import ScatterCharts from './pages/ScatterCharts';

import { ThemeProvider } from './components/theme';

import './App.css';


function App() {
  const [showSideBar, setSideBar] = useState(false);

  const [themeMode, setThemeMode] = useState("light")

  const lightTheme = () => {
    setThemeMode("light")
  }

  const darkTheme = () => {
    setThemeMode("dark")
  }


  useEffect(() => {
     document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(themeMode);
  }, [themeMode])

  const toggleSideBar = () => {
    setSideBar(prev => !prev);
  };

  return (< >
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>

      <BrowserRouter>
        <Navbar toggleSideBar={toggleSideBar} />
        <div className="flex dark:bg-gray-900 dark:text-gray-200 bg-gray-100 text-gray-800 min-h-screen  ">
          {showSideBar && <Sidebar />}
          <div className="flex-grow p-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/kanban" element={<Kanban />} />
              <Route path="/line-chart" element={<LineCharts />} />
              <Route path="/bar-chart" element={<BarCharts />} />
              <Route path='/pie-chart' element={<PieCharts />} />
              <Route path='/scatter-chart' element={<ScatterCharts />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  </>);
}

export default App;
