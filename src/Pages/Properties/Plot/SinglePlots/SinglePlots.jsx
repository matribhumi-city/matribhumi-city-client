import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link, useParams } from 'react-router-dom';
import { TextField, TextareaAutosize } from '@mui/material';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Icon } from '@iconify/react';
import { apiUrl } from '../../../../ApiServices/constant';
import { Helmet } from 'react-helmet';

const SinglePlots = () => {
	const { id } = useParams();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		data.property = id;

		// return;
		try {
			const response = await fetch(`${apiUrl}/property-bookings`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			const resData = await response.json();

			if (response.ok) {
				reset();
				console.log(resData);
				const notify = () =>
					toast.success('Successfully Submitted', {
						position: 'top-center',
					});
				notify();
			} else {
				const errorData = await response.json();
				// console.error('Server error:', errorData);
				toast.error('Failed to submit the form. Please try again.', {
					position: 'top-center',
				});
			}
		} catch (error) {
			console.error('Error submitting the form:', error);
			toast.error('An unexpected error occurred. Please try again.', {
				position: 'top-center',
			});
		}
	};

	const [plots, setPlots] = useState([]);
	const [singlePlot, setSinglePlot] = useState();

	useEffect(() => {
		fetch(`${apiUrl}/properties`)
			.then((res) => res.json())
			.then((data) => {
				setPlots(data.data);
			})
			.catch((error) => console.log(error));
	}, []);

	useEffect(() => {
		fetch(`${apiUrl}/properties/${id}`)
			.then((res) => res.json())
			.then((data) => {
				setSinglePlot(data.data);
			})
			.catch((error) => console.log(error));
	}, [id]);

	return (
		<div>
			<Swiper
				spaceBetween={30}
				effect={'fade'}
				navigation={true}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
				pagination={{
					clickable: true,
				}}
				modules={[Autoplay, EffectFade, Pagination, Navigation]}
				className='mySwiper h-screen object-cover'
			>
				<SwiperSlide>
					<img
						src={singlePlot?.propertyImage?.mainImage}
						className='h-screen object-cover'
						alt='Main'
					/>
				</SwiperSlide>
				{singlePlot?.propertyImage?.slideImages?.map((imageUrl, index) => (
					<SwiperSlide key={index}>
						<img
							src={imageUrl}
							className='h-screen object-cover'
							alt='Matribhumi City'
						/>
					</SwiperSlide>
				))}
			</Swiper>
			<div className='container mx-auto my-20'>
				<Helmet>
					<title>{`${singlePlot?.propertyTitle}`} - Matribhumi City Property Plot</title>
					<meta
						name="description"
						content="Explore available plots and properties at Matribhumi City. Choose from residential and commercial options in Nimtola, Rousonia, Dhaka, and more. Find your dream property today!"
					/>
				</Helmet>
				<div className='flex lg:flex-row flex-col justify-center items-start gap-5 xl:mx-0 mx-5'>
					<div className='w-full bg-white rounded-md flex flex-col gap-5'>
						<div className='border p-5 rounded-md'>
							<span className={`text-sm text-[10px] ${singlePlot?.status == 'sold-out' ? 'bg-red-600 text-white' : 'bg-white'} mr-2 border text-gray-500 p-1 rounded-sm capitalize`}>{singlePlot?.status}</span>
							<h1 className='text-2xl font-semibold mt-2'>
								{singlePlot?.propertyTitle}
							</h1>
							<div className='my-2 text-gray-500 flex items-center text-sm'>
								<LocationOnIcon fontSize='small' />
								{singlePlot?.location}
							</div>
							<div className='my-5 flex gap-5'>
								<span className='text-sm text-[10px] bg-white border text-gray-500 py-1 px-3 rounded-sm capitalize'>
									<strong>Sector: </strong>
									{singlePlot?.sector}
								</span>
								<span className='lg:text-sm text-[10px] bg-white border text-gray-500 py-1 px-3 rounded-sm capitalize'>
									<strong>Block: </strong>
									{singlePlot?.block}
								</span>
								<span className='lg:text-sm text-[10px] bg-white border text-gray-500 py-1 px-3 rounded-sm capitalize'>
									<strong>Road: </strong>
									{singlePlot?.road}
								</span>
							</div>
							<h3 className='font-semibold text-md mt-5 mb-2'>Description:</h3>
							<p className='text-gray-500 whitespace-pre-line'>{singlePlot?.description}</p>
						</div>
						<div className='border p-5 rounded-md grid md:grid-cols-4 grid-cols-2 gap-4 place-content-stretch'>
							<div className='flex items-center gap-2 font-bold'>
								<Icon
									icon='teenyicons:search-property-outline'
									className='text-xl'
								/>
								<span className='capitalize'>{singlePlot?.propertyType}</span>
							</div>
							<div className='flex items-center gap-2 font-bold'>
								<Icon icon='gis:measure-area' className='text-xl' />
								<span>{singlePlot?.propertySize}</span>
							</div>
							<div className='flex items-center gap-2 font-bold'>
								<Icon icon='ion:pricetags-outline' className='text-xl' />
								<span>
									Negotiate
									{/* ৳{singlePlot?.propertyPrice} */}
								</span>
							</div>
							<div className='flex items-center gap-2 font-bold'>
								<Icon
									icon='icon-park-outline:direction-adjustment-three'
									className='text-xl'
								/>
								<span className='capitalize'>{singlePlot?.propertyFace}</span>
							</div>
						</div>
						<div className='w-full bg-white rounded-md p-5 border'>
							<h3 className='font-semibold text-2xl mb-4'>Location</h3>
							<div>
								<iframe
									title='Matribhumi City Map'
									className='w-full rounded-lg h-[400px]'
									src='https://www.google.com/maps/d/u/0/embed?mid=1UtIwfKaREZSaTpUGymT5tUGqzHvlMsU&ehbc=2E312F&noprof=1'
									allowfullscreen=''
									loading='lazy'
									referrerpolicy='no-referrer-when-downgrade'
								></iframe>
							</div>
						</div>
						<div className='border p-5 rounded-md'>
							<h3 className='font-semibold text-2xl mb-4 '>Booking Form</h3>
							<form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
								<div className='flex md:flex-row flex-col gap-5'>
									<TextField
										type='name'
										{...register('customer.name', { required: true })}
										fullWidth
										label='Name'
										id='name'
									/>
									<TextField
										type='phone'
										{...register('customer.phone', { required: true })}
										fullWidth
										label='Phone'
										id='phone'
									/>
									<TextField
										type='email'
										{...register('customer.email', { required: true })}
										fullWidth
										label='Email'
										id='email'
									/>
								</div>
								<TextField
									type='address'
									{...register('customer.address', { required: true })}
									fullWidth
									label='Present Address'
									id='address'
								/>
								{/* <div className='flex md:flex-row flex-col gap-5'>
									<TextField
										type='sector'
										{...register('sector', { required: true })}
										fullWidth
										label='Sector'
										id='sector'
									/>
									<TextField
										type='block'
										{...register('block', { required: true })}
										fullWidth
										label='Block'
										id='block'
									/>
									<TextField
										type='location'
										{...register('location', { required: true })}
										fullWidth
										label='Plot Location'
										id='location'
									/>
									<TextField
										type='road'
										{...register('road', { required: true })}
										fullWidth
										label='Road'
										id='road'
									/>
								</div> */}
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
									{/* Add this container for right alignment */}
									<input
										type='submit'
										className='border px-10 py-3 rounded-md  cursor-pointer text-white bg-[#134391]'
									/>
								</div>
							</form>
						</div>
						<Toaster
							containerStyle={{
								top: 100,
								left: 20,
								bottom: 20,
								right: 20,
							}}
						/>
					</div>
					<div className='w-6/12 lg:block hidden'>
						<div className='flex flex-col gap-5'>
							{plots?.filter((item) => item?._id !== id)?.slice(0, 3)?.map((item) => (
								<Link
									key={item?._id}
									to={`/plot/${item?._id}`}
									className='flex xl:flex-row bg-white border border-gray-200 rounded-md xl:h-[230px] shadow md:flex-row flex-col md:max-w-full hover:bg-gray-100'
								>
									<div className='w-full'>
										<img
											className='object-cover w-full rounded-t-md h-full md:rounded-none md:rounded-s-md'
											src={item?.propertyImage?.mainImage}
											alt='Matribhumi City'
										/>
									</div>
									<div className='w-full p-4 flex'>
										<div>
											<span className={`text-sm text-[10px] ${item?.status == 'sold-out' ? 'bg-red-600 text-white' : 'bg-white'} mr-2 border text-gray-500 p-1 rounded-sm capitalize`}>{item?.status}</span>
											<Link alt="Matribhumi City" className='my-3 text-xl block font-semibold tracking-tight '>
												{item?.propertyTitle}
											</Link>
											<p className='font-normal text-gray-500'>
												{item?.description && item?.description?.length > 100
													? `${item?.description?.substring(0, 100)}...`
													: item?.description}
											</p>
										</div>
									</div>
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SinglePlots;
