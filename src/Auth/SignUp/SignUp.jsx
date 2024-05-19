import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import Loading from '../../component/Loading/Loading';
import { userRegister } from '../../ApiServices/auth';
import { Button, TextField } from '@mui/material';

const SignUp = () => {
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [loading, setLoading] = useState(false);

	const roles = ['User', 'Seller' ];

	// from handle
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const onSubmit = (data) => {

		// password confirm validation
		if (data.password !== data.confirmPassword)
			return setError('confirm passwrod does not matched');
		userRegister(data, setError, Swal, setSuccess, setLoading, reset);
	};

	const [open, setOpen] = useState(false);

	return (
		<div>
			<Helmet>
				<title>Matribhumi City - Sign Up</title>
				<meta
					name="description"
					content="Explore available plots and properties at Matribhumi City. Choose from residential and commercial options in Nimtola, Rousonia, Dhaka, and more. Find your dream property today!"
				/>
			</Helmet>
			<div className='lg:max-w-lg max-w-md mx-auto py-32'>
				<h3 className='text-2xl text-center font-semibold uppercase mb-5 text-[#134391]'>
					Sign Up Now
				</h3>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className='space-y-5 text-gray-700'
				>
					<select
						{...register("role", { required: true })}
						className="block w-full py-4 px-4 cursor-pointer border border-gray-300 bg-transparent rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300"
						style={{ width: '100%', boxSizing: 'border-box', borderRadius: '5px' }}
					>
						<option value="" disabled>
							Select Role
						</option>
						{roles.map((role, index) => (
							<option key={index} value={role.toLowerCase()}>
								{role}
							</option>
						))}
					</select>
					<TextField
						type="name"
						{...register("name", { required: true })}
						fullWidth
						label="Your Name"
						id="name"
					/>
					<TextField
						type="phone"
						{...register("phone", { required: true })}
						fullWidth
						label="Phone"
						id="phone"
					/>
					<TextField
						type="email"
						{...register("email", { required: true })}
						fullWidth
						label="Email"
						id="email"
					/>
					<div className='relative'>
						<TextField
							type={`${!open ? 'password' : 'text'}`}
							{...register("password", { required: true })}
							fullWidth
							label="Your Password"
							id="password"
						/>
						<Icon onClick={() => setOpen(!open)} icon={`${open ? 'mdi:eye' : 'mdi:eye-off'}`} className='absolute right-5 top-5 text-xl cursor-pointer' />
						<div className='flex justify-end mt-2'>
							{/* <Link className='text-blue-500 underline'>Forgot password</Link> */}
						</div>
					</div>

					<div className='relative'>
						<TextField
							type={`${!open ? 'password' : 'text'}`}
							{...register("confirmPassword", { required: true })}
							fullWidth
							label="Confirm Password"
							id="confirmPassword"
						/>
						<Icon onClick={() => setOpen(!open)} icon={`${open ? 'mdi:eye' : 'mdi:eye-off'}`} className='absolute right-5 top-5 text-xl cursor-pointer' />
						<div className='flex justify-end mt-2'>
							{/* <Link className='text-blue-500 underline'>Forgot password</Link> */}
						</div>
					</div>
					<div className="flex justify-between items-center">
						<Button
							type="submit"
							disabled={loading}
							style={{
								textTransform: "capitalize",
								width: '100%',
								backgroundColor: "#134391" // Set the background color here
							}}
							variant="contained"
							size="large"
						>
							{loading ? <Loading /> : 'Sign Up'}
						</Button>
					</div>
					<p className='text-center'>Already have an accout? <Link to={'/login'} className='text-blue-500'>Login</Link> </p>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
