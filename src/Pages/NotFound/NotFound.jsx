import React from 'react';
import { Link } from 'react-router-dom';
import notFound from '../../assets/notFound.png'

const NotFound = () => {
    return (
        <div className=''>
            <div className='flex flex-col justify-center items-center mt-20'>
                <span>Back to</span>
                <Link to='/' className='bg-[#134391] px-5 py-3 rounded-md font-semibold text-white mb-5'>Matribumi City</Link>
                <h5 className='text-2xl font-semibold text-center'>Sorry, Page Not Found</h5>
                <img src={notFound} alt="Matribhumi City" />
            </div>
        </div>
    );
};

export default NotFound;