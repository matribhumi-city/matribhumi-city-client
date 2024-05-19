import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { signIn } from '../../ApiServices/auth';
import { useDispatch } from 'react-redux';
import { addUser } from '../../store/slices/UserSlices';
import Loading from '../../component/Loading/Loading';
import { Helmet } from 'react-helmet';

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [open, setOpen] = useState(false);
	// from handle
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const onSubmit = async (data) => {
		setLoading(true);
		setMessage('');
		try {
			let res = await signIn(data);
			const resData = await res.json();

			if (!res.ok) {
				// console.log(resData);
				setMessage(resData?.message);
			}

			if (resData?.success) {
				dispatch(addUser(resData?.data?.user));
				// console.log(resData?.success?.user)
				navigate('/admin', { replace: true });
				notifySuccess();
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='lg:max-w-lg max-w-md mx-auto py-32'>
			<Helmet>
				<title>Matribhumi City - Login</title>
				<meta
					name="description"
					content="Explore available plots and properties at Matribhumi City. Choose from residential and commercial options in Nimtola, Rousonia, Dhaka, and more. Find your dream property today!"
				/>
			</Helmet>
			
			<h3 className='text-2xl text-center font-semibold uppercase mb-5 text-[#134391]'>
				Login Now
			</h3>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className='space-y-5 text-gray-700'
			>
				<TextField
					type='email'
					{...register('email', { required: true })}
					fullWidth
					label='Your Email'
					id='email'
				/>
				<div className='relative'>
					<TextField
						type={`${!open ? 'password' : 'text'}`}
						{...register('password', { required: true })}
						fullWidth
						label='Your Password'
						id='password'
					/>
					<Icon
						onClick={() => setOpen(!open)}
						icon={`${open ? 'mdi:eye' : 'mdi:eye-off'}`}
						className='absolute right-5 top-5 text-xl cursor-pointer'
					/>
					<p className='text-end mt-2'>
						<Link to={'/user/forgetPasswordRequest'} className='text-blue-500'>
							Forget Password
						</Link>
					</p>
				</div>
				<p className='font-bold text-red-600'>{message}</p>
				<div className='flex justify-between items-center'>
					<Button
						type='submit'
						disabled={loading}
						style={{
							textTransform: 'capitalize',
							width: '100%',
							backgroundColor: '#134391', // Set the background color here
						}}
						variant='contained'
						size='large'
					>
						{loading ? <Loading /> : 'Login'}
					</Button>
				</div>
				<p className='text-center'>
					Don't haven't accout?{' '}
					<Link to={'/sign-up'} className='text-blue-500'>
						Register
					</Link>{' '}
				</p>
			</form>
		</div>
	);
};

export default Login;
