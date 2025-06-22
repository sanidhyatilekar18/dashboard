import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faCartShopping, faUserTie, faTable } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays, faUser } from '@fortawesome/free-regular-svg-icons';
import { NavLink } from 'react-router-dom';
const getLinkClass = ({ isActive }) =>
  `flex items-center mt-3 gap-3 text-xl font-semibold px-3 py-2 rounded-md 
   ${isActive ? 'text-black bg-white' : 'text-white hover:bg-amber-400'}`;
function Sidebar() {
  return (
    <div className='w-[250px] h-screen bg-amber-300 text-white text-start px-4 py-6'>
      <NavLink to="/" className={getLinkClass}>
        <FontAwesomeIcon icon={faHouse} size="xl" />
        <span className='text-2xl font-bold'>Home</span>
      </NavLink>

      <div className='mt-4'>
        <span className='font-bold text-2xl'>Pages</span>
        <div className='border-b border-white mt-2'></div>

        <NavLink to="/orders" className={getLinkClass}>
          <FontAwesomeIcon icon={faCartShopping} />
          Orders
        </NavLink>

        <NavLink to="/employees" className={getLinkClass}>
          <FontAwesomeIcon icon={faUserTie} />
          Employees
        </NavLink>

        <NavLink to="/customers" className={getLinkClass}>
          <FontAwesomeIcon icon={faUser} />
          Customers
        </NavLink>

        <div className='border-b border-white mt-4'></div>
      </div>

      <div className='mt-4'>
        <span className='font-bold text-2xl'>Apps</span>
        <div className='border-b border-white mt-2'></div>

        <NavLink to="/calendar" className={getLinkClass}>
          <FontAwesomeIcon icon={faCalendarDays} />
          Calendar
        </NavLink>

        <NavLink to="/kanban" className={getLinkClass}>
          <FontAwesomeIcon icon={faTable} />
          Kanban
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
