import React, { useState } from 'react';
import whiteLogo from '../../../assets/Matribhumi-Logo.png';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { TextField } from '@mui/material';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signIn } from '../../../ApiServices/auth';
import { addUser } from '../../../store/slices/UserSlices';

const SingIn = () => {
	const dispatch = useDispatch();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	const from = location.state?.from?.pathname || '/';

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		setLoading(true);
		try {
			let res = await signIn(data);
			const resData = await res.json();

			if (!res.ok) {
				console.log(resData);
			}

			if (resData.success) {
				console.log(resData.data.user);
				dispatch(addUser(resData.data.user));
				navigate(from, { replace: true });
				notifySuccess();
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const notifySuccess = () =>
		toast.success('Successfully Login', {
			position: 'top-center',
		});

	const notifyError = () =>
		toast.error('Login Failed', {
			position: 'top-center',
		});

	if (isAuthenticated) {
		return <Navigate to={'/admin'} replace={true} />;
	}

	return (
		<div className='min-h-screen flex lg:flex-row flex-col'>
			<Helmet>
                <title>Matribhumi City - Login</title>
                <meta
                    name="description"
                    content="Explore available plots and properties at Matribhumi City. Choose from residential and commercial options in Nimtola, Rousonia, Dhaka, and more. Find your dream property today!"
                />
            </Helmet>
			<div className='bg-[#134391] w-full flex flex-col place-content-center items-center lg:h-auto h-[300px]'>
				<Link to={'/'}>
					<img src={whiteLogo} alt='Matribhumi Group' />
				</Link>
				<p className='mt-5 text-white'>
					You are admin? Please fill the login form!
				</p>
			</div>

			<div className='w-full flex place-content-center items-center lg:pt-0 sm:pt-20'>
				<form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
					<h2 className='flex justify-center text-xl font-semibold'>
						Admin Login
					</h2>
					<div className='flex flex-col gap-5'>
						<TextField
							type='email'
							{...register('email', { required: true })}
							fullWidth
							label='Email'
							id='email'
						/>
						<TextField
							type='password'
							{...register('password', { required: true })}
							fullWidth
							label='Password'
							id='password'
						/>
					</div>
					<div className='flex justify-left'>
						{' '}
						{/* Add this container for right alignment */}
						<input
							type='submit'
							value={'Sign In'}
							className='border px-10 py-3 rounded-md  cursor-pointer text-white bg-[#134391] w-full'
						/>
					</div>
					<Toaster
						containerStyle={{
							top: 100,
							left: 20,
							bottom: 20,
							right: 20,
						}}
					/>
				</form>
			</div>
		</div>
	);
};

export default SingIn;
