import React, { useEffect, useState } from 'react';
import { apiUrl } from '../../../ApiServices/constant';

const ManageBooking = () => {
    const [booking, setBooking] = useState([])

    useEffect(() => {
        fetch(`${apiUrl}/property-bookings`)
            .then(res => res.json())
            .then((data) => {
                setBooking(data.data)
            })
    }, [])

    return (
        <div className='animate__animated animate__fadeIn'>
            <h2 className='font-semibold text-xl px-8 py-5 bg-[#134391] text-white rounded-md'>Manage Booking</h2>
            <hr className='my-3' />
            {(booking?.length == 0 || booking?.length == null)?
			<p className='text-center mt-5'>No Data</p>
			:
            <div className='flex flex-col gap-5'>
                {booking?.map((item, index) => {
                    const createdAtDate = new Date(item.createdAt);

                    return (
                        <div key={item?._id} className='bg-white px-8 py-5 rounded-md relative'>
                            <span className='absolute -top-2 -left-2 bg-[#F4F4F4] border-4 border-white w-5 h-5 flex justify-center items-center p-4 rounded-full'>{index + 1}</span>
                            <div className='flex flex-col gap-3'>
                                <p className='font-semibold text-lg'>Date: <span className='font-normal'>{createdAtDate.toLocaleString()}</span></p>
                                <hr />
                                <p className='font-semibold text-lg'>Name: <span className='font-normal'>{item?.customer.name}</span></p>
                                <hr />
                                <p className='font-semibold text-lg'>Phone: <span className='font-normal'>{item?.customer.phone}</span></p>
                                <hr />
                                <p className='font-semibold text-lg'>Email: <span className='font-normal'>{item?.customer.email}</span></p>
                                <hr />
                                <p className='font-semibold text-lg'>Address: <span className='font-normal'>{item?.customer.address}</span></p>
                                <hr />
                                <p className='font-semibold text-lg'>Property Location: <span className='font-normal'>{item?.location}</span></p>
                                <hr />
                            </div>
                            <div className='my-5 flex gap-5'>
                                <span className='text-sm text-[10px] bg-white border text-gray-500 py-1 px-3 rounded-sm capitalize'><strong>Sector: </strong>{item?.sector}</span>
                                <span className='lg:text-sm text-[10px] bg-white border text-gray-500 py-1 px-3 rounded-sm capitalize'><strong>Block: </strong>{item?.block}</span>
                                <span className='lg:text-sm text-[10px] bg-white border text-gray-500 py-1 px-3 rounded-sm capitalize'><strong>Road: </strong>{item?.road}</span>
                            </div>
                            <hr />
                            <p className='font-semibold text-lg mt-5 text-justify'>Massage: <br /> <span className='font-normal whitespace-pre-line'>{item?.message}</span></p>
                        </div>
                    );
                })}
            </div>
            }
        </div>
    );
};

export default ManageBooking;