import React, { useEffect, useState } from 'react';
import { apiUrl } from '../../../ApiServices/constant';
import GridLoader from 'react-spinners/GridLoader';

const ManageCareer = () => {

    const [careers, setCareers] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch(`${apiUrl}/career`)
            .then(res => res.json())
            .then(data => {
                setLoading(false)
                setCareers(data.data)
            })
    }, [])

    return (
        <div className='animate__animated animate__fadeIn'>
            <h2 className='font-semibold text-xl px-8 py-5 bg-[#134391] text-white rounded-md'>Submited Careers</h2>
            <hr className='my-3' />
            {loading ?
                <div className="animate__animated animate__heartBeat animate__infinite infinite  animate__slower 3s flex justify-center mt-20">
                    <GridLoader
                        color="#134391"
                        loading={loading}
                        size={15}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
                :
                <div className='flex flex-col gap-5'>
                    {
                        careers?.map((item, index) => (
                            <div key={item?._id} className='bg-white px-8 py-5 rounded-md relative'>
                                <span className='absolute -top-2 -left-2 bg-[#F4F4F4] border-4 border-white w-5 h-5 flex justify-center items-center p-4 rounded-full'>{index + 1}</span>
                                <div className='flex flex-col gap-3'>
                                    
                                    <p className='font-semibold text-lg'>Name: <span className='font-normal'>{item?.name}</span></p>
                                    <hr />
                                    <p className='font-semibold text-lg'>Phone: <span className='font-normal'>{item?.phone}</span></p>
                                    <hr />
                                    <p className='font-semibold text-lg'>Email: <span className='font-normal'>{item?.email}</span></p>
                                    <hr />
                                    <p className='font-semibold text-lg'>Position: <span className='font-normal'>{item?.position}</span></p>
                                    <hr />
                                </div>
                                <p className='font-semibold text-lg mt-5 text-justify'>Massage: <br /> <span className='font-normal whitespace-pre-line'>{item?.message}</span></p>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    );
};

export default ManageCareer;