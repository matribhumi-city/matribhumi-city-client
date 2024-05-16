import React, { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import logo from '../../assets/Matribhumi-Logo-Main.png'
import { Toolbar } from '@mui/material';
import { Icon } from '@iconify/react';
import { logOut } from '../../ApiServices/auth';

const Dashboard = () => {

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const handleLogout = (isLogout) => {
        if(isLogout){
            const confirmLogout = window.confirm('Are you sure you want to logout from Matribhumi Admin?');
            if(confirmLogout) {
                logOut();
            }
        }
    }
    
    return (
        <div className='animate__animated animate__fadeIn'>
            <div className='px-8 py-3 flex justify-between bg-white fixed z-20 w-full'>
                <Link to={'/'} className=''>
                    <img src={logo} className='w-6/12' alt="Matribhumi City" />
                </Link>
                <div className='wfull'>
                    <div className='flex items-center gap-2'>
                        <div className='text-end'>
                            <h3 className='font-semibold'>Admin</h3>
                        </div>
                        <Icon icon="eos-icons:admin-outlined" className='text-3xl text-[#134391]' />
                    </div>
                </div>
            </div>
            <Toolbar />
            <div className='flex'>
                <div className='bg-white lg:w-2/12 w-6/12 h-screen left-0'>
                    <nav>
                        <ul className='dashbordMenu'>
                            <NavLink to={'/admin'}><li className=' text-gray-500 px-8 w-full py-3 font-semibold'>Dashboard</li></NavLink>
                            <hr />
                            <div className='animate__animated animate__fadeIn'>
                                <NavLink to={'manage-property'}><li className='text-gray-500 pl-8 w-full py-3 font-semibold'>Property</li></NavLink>
                            </div>
                            <hr />

                            {/* blog */}
                            <div className='animate__animated animate__fadeIn'>
                                <NavLink to={'manage-blog'}><li className='text-gray-500 pl-8 w-full py-3 font-semibold'>Blogs</li></NavLink>
                            </div>
                            <hr />

                            <div className='animate__animated animate__fadeIn'>
                                <NavLink to={'manage-bookVisit'}><li className='text-gray-500 pl-8 w-full py-3 font-semibold'>Book Visit</li></NavLink>
                            </div>
                            <hr />

                            {/* Manage Booking  */}
                            <div className='animate__animated animate__fadeIn'>
                                <NavLink to={'manage-Booking'}><li className='text-gray-500 pl-8 w-full py-3 font-semibold'>Bookings</li></NavLink>
                            </div>
                            <hr />

                            {/* team  */}
                            <div className='animate__animated animate__fadeIn'>
                                <NavLink to={'manage-team'}><li className='text-gray-500 pl-8 w-full py-3 font-semibold'>Teams</li></NavLink>
                            </div>
                            <hr />

                            {/* Achievement  */}
                            {/* <div className='animate__animated animate__fadeIn'>
                                <NavLink to={'achievement'}><li className='text-gray-500 pl-8 w-full py-3 font-semibold'>Achievements</li></NavLink>
                            </div>
                            <hr /> */}

                            {/* Manage Contact  */}
                            <div className='animate__animated animate__fadeIn'>
                                <NavLink to={'manageContact'}><li className='text-gray-500 pl-8 w-full py-3 font-semibold'>Contacts</li></NavLink>
                            </div>
                            <hr />
                            {/* Manage Career  */}
                            <div className='animate__animated animate__fadeIn'>
                                <NavLink to={'manageCareer'}><li className='text-gray-500 pl-8 w-full py-3 font-semibold'>Careers</li></NavLink>
                            </div>
                            <div className='animate__animated animate__fadeIn bg-[#004282] cursor-pointer'>
                                <li onClick={handleLogout} className='text-white hover:text-gray-500 duration-200 pl-8 w-full py-3 font-semibold'>Log Out</li>
                            </div>
                        </ul>
                    </nav>
                </div>

                <div className='w-full bg-[#F4F4F4] min-h-screen h-full p-8'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;