import React, { useEffect, useState } from 'react';
import VillaIcon from '@mui/icons-material/Villa';
import { apiUrl } from '../../../ApiServices/constant';

const MainDashboard = () => {

    const [properties, setProperties] = useState([]);

    useEffect(() => {
        // setLoading(true);
        fetch(`${apiUrl}/properties`)
            .then((res) => res.json())
            .then((data) => {
                setProperties(data.data);
                console.log(data);
                // setLoading(false)
            })
            .catch((error) => console.log(error));
        // setFilteredProperties(propertys);
    }, []);

    const availableProperty = properties.filter(blogItem => blogItem?.status == 'available');
    const soldProperty = properties.filter(blogItem => blogItem?.status == 'sold-out');


    return (
        <div className='flex lg:flex-row flex-col gap-5 animate__animated animate__fadeIn'>
            <div className='bg-[#134391] p-5 text-white rounded-md w-full flex items-center justify-between'>
                <div className='flex items-center gap-5'>
                    <VillaIcon fontSize='large' />
                    <h4 className='text-2xl font-semibold'>Total Properties</h4>
                </div>
                <span className='flex justify-center items-center text-2xl font-semibold w-5 h-5 bg-white p-5 rounded-md text-[#134391]'>{properties.length}</span>
            </div>
            <div className='w-full flex gap-5'>
                <div className='bg-white p-5 rounded-md w-full flex justify-between items-center'>
                    <p className='font-semibold'>Properties Available</p>
                    <span className='text-2xl font-semibold'>{availableProperty.length}</span>
                </div>
                <div className='bg-white p-5 rounded-md w-full flex justify-between items-center'>
                    <p className='font-semibold'>Properties Sold Out</p>
                    <span className='text-2xl font-semibold'>{soldProperty.length}</span>
                </div>
            </div>
        </div>
    );
};

export default MainDashboard;