import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBell } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import ThemeBtn from './ThemeBtn';


function Navbar({ toggleSideBar }) {
    const [showNotifications, setShowNotifications] = React.useState(false);

    const handleNotifications = () => {
        setShowNotifications((prev) => !prev);
    };
    const [showUserProfile, setShowUserProfile] = React.useState(false);

    const handleUserProfile = () => {
        setShowUserProfile((prev) => !prev);
    };

    return (
        <div className="w-full h-16 bg-amber-300 text-white flex items-center justify-between px-4 sm:px-6 md:max-w-screen sm:max-w-full md:min-w-full sm:min-w-screen md:justify-between sm:justify-between  absolute ">

            <div className="flex items-center gap-4">
                <button onClick={toggleSideBar} className='cursor-pointer p-4'>
                    <FontAwesomeIcon icon={faBars} size="2xl" />
                </button>

                <h1 className="text-xl sm:text-2xl font-bold hidden sm:block">Dashboard</h1>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 relative">
                <div className=''><ThemeBtn /></div>

                <FontAwesomeIcon icon={faBell} size='2xl' style={{ color: "white" }} onClick={handleNotifications} />
                {showNotifications && (
                    <div className='bg-gray-100 rounded-xl shadow-xl p-6 h-40 w-80 absolute top-16 right-4'>
                        <span className='text-gray-500 '>No Notifications</span>
                    </div>
                )}
                <div className='flex items-center gap-2 p-2 cursor-pointer relative' onClick={handleUserProfile}>
                    <FontAwesomeIcon icon={faUser} size='2xl' />
                    <span className="hidden lg:inline bg-amber-50 text-black px-2 py-1 rounded-lg text-sm font-bold">
                        Hi! User
                    </span>
                    {showUserProfile && (
                        <div className='bg-white text-black rounded-xl shadow-xl p-6 w-64 absolute top-14 right-0 z-50'>
                            <div className="flex flex-col items-center">
                                <FontAwesomeIcon icon={faUser} size='3x' className="mb-2" />
                                <span className="font-bold text-lg mb-1">User Name</span>
                                <span className="text-gray-500 mb-4">user@email.com</span>
                                <button className="bg-amber-300 text-white px-4 py-2 rounded-lg font-semibold hover:bg-amber-400 transition">
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar
