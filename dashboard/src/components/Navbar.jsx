import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBell } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import ThemeBtn from './ThemeBtn';


function Navbar({ toggleSideBar  }) {
    return (
        <div className='w-full h-16 text-white bg-amber-300 px-4 flex items-center justify-between '>


            <button onClick={toggleSideBar} className='cursor-pointer'>
                <FontAwesomeIcon icon={faBars} size="2xl" />
            </button>

            <div className='font-extrabold text-3xl ml-[-980px] md:disabled'>
                Dashboard
            </div>
            <div className='ml-480'><ThemeBtn /></div>
            

            <div className='flex items-center gap-8'>
                <FontAwesomeIcon icon={faBell} size='2xl' style={{ color: "white" }} />
                
                <div className='pr-4 flex items-center'>
                    <FontAwesomeIcon icon={faUser} size='2xl' />
                    <span className='ml-3 px-2 py-1 bg-amber-50 text-black font-bold text-center rounded-lg hidden lg:inline'>
                        Hi! User
                    </span>

                </div>

            </div>

        </div>
    )
}

export default Navbar
