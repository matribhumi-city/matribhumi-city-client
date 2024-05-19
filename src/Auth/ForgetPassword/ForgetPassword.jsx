import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Loading from '../../component/Loading/Loading';
import { Button, TextField } from '@mui/material';
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const ForgetPassword = () => {
	const [message, setMessage] = useState('');
	const navigate = useNavigate();
	const [color, setColor] = useState('');
	const [loading, setLoading] = useState(false);
	const [matchPassword, setMatchPassword] = useState('');
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const resetToken = searchParams.get('resetId');

	// from handle
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const onSubmit = async (password) => {
		setMessage('');
		// console.log(password)
		if (password.password !== password.confirmPassword) {
			setColor('red');
			setMessage('confirm Password does not match');
			return toast.error('confirmPassword does not match');
		}

		try {
			const res = await fetch(`${apiUrl}/user/forget-password/${resetToken}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'Application/json',
				},
				body: JSON.stringify(password),
			});
			const data = await res.json();
			// console.log(data);
			if (!res.ok) {
				setColor('red');
				setMessage(data.message);
				console.log(data.massage)
			}
			if (res.ok) {
				setColor('green');
				setMessage(data.message);
				console.log(data.massage)
				toast.success('password reset Successfull');
				navigate('/login', { replace: true });
			}
		} catch (error) {
			console.log(error);
			console.log(error.massage)
			setMessage(error.message);
		} finally {
			setLoading(false);
		}
	};

	// password eye show hide
	const [open, setOpen] = useState(false);

	const toggle = () => {
		setOpen(!open);
	};

	return (
		<div className='lg:max-w-lg max-w-md mx-auto py-32'>
			<div className='mb-5'>
				<h3 className='text-2xl font-semibold mb-3 text-[#134391]'>
					Set your new password
				</h3>
			</div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className=' text-gray-700'
			>
				<div className='relative'>
					<TextField
						type={`${!open ? 'password' : 'text'}`}
						{...register("password", { required: true })}
						fullWidth
						label="Your Password"
						id="password"
					/>
					<Icon onClick={() => setOpen(!open)} icon={`${open ? 'mdi:eye' : 'mdi:eye-off'}`} className='absolute right-5 top-5 text-xl cursor-pointer' />
				</div>

				<div className='relative mt-3'>
					<TextField
						type={`${!open ? 'password' : 'text'}`}
						{...register("confirmPassword")}
						fullWidth
						label="Confirm Password"
						id="confirmPassword"
					/>
					<Icon onClick={() => setOpen(!open)} icon={`${open ? 'mdi:eye' : 'mdi:eye-off'}`} className='absolute right-5 top-5 text-xl cursor-pointer' />
				</div>
				<div className="flex justify-between gap-5 mt-5 items-center">
					<Link to={'/login'}>
						<Button
							type="button"
							disabled={loading}
							style={{
								textTransform: "capitalize",
								width: 'auto',
								color: 'gray',
								border: '2px solid gray',
								backgroundColor: "transparent" // Set the background color here
							}}
							variant="contained"
							size="large"
						>
							Cancel
						</Button>
					</Link>
					<Button
						type="submit"
						disabled={loading}
						style={{
							textTransform: "capitalize",
							width: 'auto',
							backgroundColor: "#134391" // Set the background color here
						}}
						variant="contained"
						size="large"
					>
						{loading ? <Loading /> : 'Change Password'}
					</Button>
				</div>
			</form>
		</div>
	);
};

export default ForgetPassword;
