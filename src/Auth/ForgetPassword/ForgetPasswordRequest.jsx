import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Loading from '../../component/Loading/Loading';
import { Button, TextField } from '@mui/material';
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const ForgetPasswordRequest = () => {
	// from handle
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);
	const [color, setColor] = useState('');
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const onSubmit = async (user) => {
		setLoading(true);
		setMessage('');
		try {
			const res = await fetch(`${apiUrl}/user/reset-password`, {
				method: 'POST',
				headers: {
					'Content-Type': 'Application/json',
				},
				body: JSON.stringify(user),
			});
			const data = await res.json();

			if (!res.ok) {
				setColor('red');
				setMessage(data.message);
			}
			if (res.ok) {
				setColor('green');
				setMessage(data.message);
			}
		} catch (error) {
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
					Find Your Account
				</h3>
				<p>
					Please enter your email address to search for your account.
				</p>
			</div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='text-gray-700'
			>
				<TextField
					type="email"
					{...register("email", { required: true })}
					fullWidth
					label="Email"
					id="email"
				/>
				{message&&<p className={`text-${color}-600 mt-5`}>{message}</p>}
				<div className="flex justify-between gap-5 mt-5 items-center">
					<Link to={'/login'}>
						<Button
							type="button"
							disabled={loading}
							style={{
								textTransform: "capitalize",
								width: '100%',
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
						{loading ? <Loading /> : 'Search'}
					</Button>
				</div>
			</form>
		</div>
	);
};

export default ForgetPasswordRequest;
