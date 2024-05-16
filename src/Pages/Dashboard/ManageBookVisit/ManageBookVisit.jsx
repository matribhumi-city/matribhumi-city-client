import React, { useEffect, useState } from 'react';
import { apiUrl } from '../../../ApiServices/constant';

const ManageBookVisit = () => {
	// const visits = data;
	const [visits, setVisits] = useState([]);

	useEffect(() => {
		console.log(apiUrl);
		fetch(`${apiUrl}/visits`)
			.then((res) => res.json())
			.then((data) => {
				setVisits(data.data);
				console.log(data);
			})
			.catch((error) => console.log(error));
		// setFilteredProperties(propertys);
	}, []);

	return (
		<div className='animate__animated animate__fadeIn'>
			<h2 className='font-semibold text-xl px-8 py-5 bg-[#134391] text-white rounded-md'>
				Book Visit People
			</h2>
			<hr className='my-3' />
			{(visits?.length <= 0)?
			<p className='text-center mt-5'>No Data</p>
			:
			<div className='flex flex-col gap-5'>
				{visits?.map((item, index) => {
					const originalDate = new Date(item?.date);
					const options = { timeZone: "Asia/Dhaka" };

					return (
						<div key={item?._id} className='bg-white px-8 py-5 rounded-md relative'>
							<div>
								<span className='absolute -top-2 -left-2 bg-[#F4F4F4] border-4 border-white w-5 h-5 flex justify-center items-center p-4 rounded-full'>{index + 1}</span>
								<div className='flex flex-col gap-3'>
									<p className='font-semibold text-lg'>
										Name: <span className='font-normal'>{item?.name}</span>
									</p>
									<hr />
									<p className='font-semibold text-lg'>
										Phone: <span className='font-normal'>{item?.phone}</span>
									</p>
									<hr />
									<p className='font-semibold text-lg'>
										Email: <span className='font-normal'>{item?.email}</span>
									</p>
									<hr />
								</div>
								<div className='flex divide-x-2 gap-5 my-5'>
									<span>
										<strong>Date:</strong> {originalDate.toLocaleString("en-US", options)}
									</span>
									<span className='pl-5'>
										<strong>Time:</strong> {item?.time}
									</span>
									<span className='pl-5'>
										<strong>Pick Point:</strong> {item?.pick}
									</span>
									<span className='pl-5'>
										<strong>Drop Point:</strong> {item?.drop}
									</span>
									{/* <span>
										<strong>Number Of Visitor:</strong> {index+1}
									</span> */}
								</div>
								<hr />
								<address className='py-4'>
									<strong>Present Address:</strong> {item?.address}
								</address>
								<hr />
								<p className='font-semibold text-lg mt-5 text-justify'>
									Massage: <br /> <span className='font-normal whitespace-pre-line'>{item?.message}</span>
								</p>
							</div>
						</div>
					);
				})}
			</div>
			}
		</div>
	);
};

export default ManageBookVisit;
