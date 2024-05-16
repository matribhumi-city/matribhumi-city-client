import React from 'react';
import PageParallax from '../../component/pageParallax/pageParallax';
import bookVisit from '../../assets/Home-Slider/slider2.jpg';

import { Button, Divider, TextField, TextareaAutosize } from '@mui/material';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { apiUrl } from '../../ApiServices/constant';

const BookVisit = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		console.log(data);

		fetch(`${apiUrl}/visits`, {
			method: 'POST',
			headers: {
				'Content-Type': 'Application/json',
			},
			credentials: 'include',
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					notify();

					reset();
				}
			})
			.catch((error) => console.log(error));
	};

	const notify = () =>
		toast.success('Successfully Submited', {
			position: 'top-center',
		});

	return (
		<div className='min-h-screen'>
			<Helmet>
				<title>Book a Visit - Matribhumi City</title>
				<meta
					name='description'
					content='Unlock your dream home at Matribhumi City! Book a visit to explore futuristic living just 30 minutes from Motijheel, with six plot types and flexible installments. Contact us and embrace urban-nature harmony today!'
				/>
			</Helmet>
			<PageParallax bgImage={bookVisit} pageTitle={'Book Visit'} />
			<div className=' p-5 mt-5 rounded-md container mx-auto py-20'>
				<h2 className='text-4xl font-bold text-left text-[#134391]'>
					Book Visit
				</h2>
				<hr className='my-3' />
				<div className='w-full mb-10'>
					{/* <Divider textAlign="left" style={{ fontSize: "2em", fontWeight: "bold", marginBottom: '10px', color: '#134391' }} className='animate__fadeInUp'>Our Story</Divider> */}
					<p className='text-left'>
						Unlock your dream home at Matribhumi City! Book a visit to explore
						futuristic living just 20 minutes from Motijheel, with six plot
						types and flexible installments. <br /> Contact us at ( +8801 324 730 515 ), (info@matribhumicity.com) Or please fillup This form.
					</p>
				</div>
				<form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
					<div className='flex lg:flex-row flex-col gap-5'>
						<TextField
							type='name'
							{...register('name', { required: true })}
							fullWidth
							label='Name'
							id='name'
						/>
						<TextField
							type='phone'
							{...register('phone', { required: true })}
							fullWidth
							label='Phone'
							id='phone'
						/>
						<TextField
							type='email'
							{...register('email', { required: true })}
							fullWidth
							label='Email'
							id='email'
						/>
					</div>
					<div className='flex lg:flex-row flex-col gap-5'>
						<TextField
							type='date'
							{...register('date', { required: true })}
							fullWidth
							id='date'
						/>
						<TextField
							type='time'
							{...register('time', { required: true })}
							fullWidth
							label=''
							id='time'
						/>
						<TextField
							type='pick'
							{...register('pick', { required: true })}
							fullWidth
							label='Pick Point'
							id='pick'
						/>
						{/* <TextField
							type='number'
							{...register('numberOfVisitor', { required: false })}
							fullWidth
							label='Number Of Visitor'
							id='number'
							disabled
						/> */}
					</div>
					<div className='flex lg:flex-row flex-col gap-5'>
						<TextField
							type='drop'
							{...register('drop', { required: true })}
							fullWidth
							label='Drop Point'
							id='drop'
						/>
						<TextField
							type='address'
							{...register('address', { required: true })}
							fullWidth
							label='Present Address'
							id='address'
						/>

					</div>
					<TextareaAutosize
						{...register('message', { required: true })}
						fullWidth
						style={{
							width: '100%',
							minHeight: '100px',
							border: '1px solid #ccc',
							borderRadius: '4px',
							padding: '8px',
						}}
						placeholder='Your Massage'
						error
					/>
					<div className='flex justify-left'>
						{' '}
						{/* Add this container for right alignment */}
						<input
							type='submit'
							className='border px-10 py-3 rounded-md  cursor-pointer text-white bg-[#134391]'
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default BookVisit;
