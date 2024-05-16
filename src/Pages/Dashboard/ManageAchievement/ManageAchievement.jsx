import React, { useEffect, useState } from 'react';
import { Button, TextareaAutosize } from '@mui/material';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SearchIcon from '@mui/icons-material/Search';
import { Helmet } from 'react-helmet';
import { apiUrl } from '../../../ApiServices/constant';
import { updateAchievement } from '../../../ApiServices/achievementService';
import imageCompression from 'browser-image-compression';

const ManageAchievement = () => {
	// Assuming 'data' is imported or defined elsewhere
	// const achievements = data;

	const [achievements, setAchievement] = useState([]);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const [selectedImages, setSelectedImages] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredAchievements, setFilteredAchievements] = useState([]);

	const [refetch, setRefetch] = useState(false);
	const [editableAchievement, setEditableAchievement] = useState(null);
	const [achievementId, setAchievementId] = useState('');


	// Add the missing state initialization
	const [updatedData, setUpdatedData] = useState({});

	const compressImage = async (imageFile) => {
		const options = {
			maxSizeMB: 0.05,
			maxWidthOrHeight: 1920,
			useWebWorker: true,
		};

		try {
			const compressedFile = await imageCompression(imageFile, options);

			if (typeof compressedFile === 'object' && compressedFile instanceof Blob) {
				return compressedFile;
			} else {
				console.error('Invalid compressed image data:', compressedFile);
				return imageFile;
			}
		} catch (error) {
			console.error('Image compression error:', error);
			return imageFile;
		}
	};

	const onSubmit = async (data) => {
		try {
			if (editableAchievement) {
				await updateAchievement(data);
				console.log('old', data)
			} else {
				await addNewAchievement(data);
				console.log('new', data)
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const addNewAchievement = async (data) => {
		try {
			const compressedImage = await compressImage(selectedImages[0]);

			const formDataObj = new FormData();
			formDataObj.append('data', JSON.stringify(data));
			formDataObj.append('image', compressedImage);

			const res = await fetch(`${apiUrl}/achievements`, {
				method: 'POST',
				credentials: 'include',
				body: formDataObj,
			});

			const responseData = await res.json();

			if (responseData.success) {
				toast.success('New Achievement added');
				setSelectedImages([]);
				reset();
			}
		} catch (error) {
			console.error('Error adding new Achievement:', error);
		}
	};

	const updateAchievement = async (data) => {
		try {
			const compressedImage = await compressImage(selectedImages[0]);

			const formDataObj = new FormData();
			formDataObj.append('data', JSON.stringify(data));
			formDataObj.append('image', compressedImage);

			const res = await fetch(`${apiUrl}/achievements/${editableAchievement._id}`, {
				method: 'PUT',
				credentials: 'include',
				body: formDataObj,
			});

			const responseData = await res.json();

			if (responseData.success) {
				toast.success('Achievement updated');
				setEditableAchievement(null);
				setSelectedImages([]);
				reset();
			}
		} catch (error) {
			console.error('Error updating Achievement:', error);
		}
	};

	const handleImageChange = (e) => {
		let files = e.target.files;
		setSelectedImages([...selectedImages, ...files]);
	};

	// const onUpdate = async (e) => {
	// 	e.preventDefault();

	// 	const newFormData = {
	// 		...updatedData,
	// 	};

	// 	let formDataObj = new FormData();
	// 	formDataObj.append('data', JSON.stringify(newFormData));

	// 	if (selectedImages.length > 0) {
	// 		formDataObj.append('image', selectedImages[0]);
	// 	}

	// 	updateAchievement(
	// 		JSON.stringify(updatedData),
	// 		achievementId,
	// 		setLoading,
	// 		toast,
	// 		setRefetch
	// 	);
	// };

	const getAchievementToEdit = (id) => {
		fetch(`${apiUrl}/achievements/${id}`)
			.then((res) => res.json())
			.then((data) => {
				setEditableAchievement(data.data);
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		getAchievementToEdit(achievementId);
	}, [achievementId]);

	// const handleRemoveSelectedImage = (index) => {
	// 	const images = [...selectedImages];
	// 	images.splice(index, 1);
	// 	setSelectedImages(images);
	// };

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUpdatedData({ ...updatedData, [name]: value });
	};

	useEffect(() => {
		setFilteredAchievements(achievements);
	}, [achievements]);

	useEffect(() => {
		const fetchAchievements = async () => {
			try {
				const res = await fetch(`${apiUrl}/achievements`);
				const data = await res.json();
				if (data.success) {
					setAchievement(data.data);
					setFilteredAchievements(data.data);
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchAchievements();
	}, [refetch]);

	const handleEditAchievement = (achievement) => {
		setEditingTeam(achievement);
		setValue('name', achievement.name);
		setValue('year', achievement.year);
		// Additional fields if needed

		// If the team member has an image, set it as the selected image for editing
		if (achievement.image) {
			setSelectedImages([achievement.image]);
		}
	};

	const handleDeleteAchievement = async (achievementId) => {
		const confirm = window.confirm(
			'Are you sure you want to delete this achievement'
		);

		if (confirm) {
			try {
				const response = await fetch(`${apiUrl}/achievements/${achievementId}`, {
					method: 'DELETE',
				});

				if (response.ok) {
					console.log('Achievement deleted successfully');
					toast.success('Achievement deleted successfully', {
						position: 'top-center',
					});
				} else {
					console.error('Failed to delete achievement');
					toast.error('Failed to delete achievement', {
						position: 'top-center',
					});
				}
			} catch (error) {
				console.error('Error while deleting achievement:', error);
			}
		}
	};

	const handleRemoveSelectedImage = (index) => {
		const images = [...selectedImages];
		images.splice(index, 1);
		setSelectedImages(images);
	};

	const handleSearchChange = (e) => {
		const term = e.target.value;
		setSearchTerm(term);

		if (term.trim() === '') {
			setFilteredAchievements(achievements);
		} else {
			const filteredAchievements = achievements.filter((achievement) =>
				achievement.achievementName.toLowerCase().includes(term.toLowerCase())
			);
			setFilteredAchievements(filteredAchievements);
		}
	};

	const renderTextField = (name, label, validation) => (
		<TextField
			{...register(name, validation)}
			fullWidth
			label={label}
		/>
	);

	return (
		<div className='min-h-screen animate__animated animate__fadeIn'>
			<Helmet>
				<title>Manage team - Matribhumi City Admin</title>
				<meta
					name='description'
					content='Explore Matribhumi City, a prime housing venture near Nimtala. Discover our meticulously planned Smart City with essential amenities, flexible plots, and a strategic location in Dhaka-Mawa highway.'
				/>
			</Helmet>
			{/* Add Achievement  */}
			<div className='bg-white rounded-md'>
				<h2 className='font-semibold text-xl px-8 py-5'>
					{editableAchievement?._id ? 'Update Achievement' : 'Add Achievement'}
				</h2>
				<hr />
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='flex flex-col gap-5 p-8'
				>
					<strong className='text-gray-500 text-lg'>*** Please ensure uploaded images do not exceed 1 MB in size for optimal website performance. ***</strong>
					<div className='flex gap-5'>
						<div className='w-full'>
							{renderTextField('name', 'Achievement Name', { required: true })}
						</div>
						<div className='w-full'>
							{renderTextField('year', 'year', { required: true })}
						</div>
					</div>
					<input
						autoComplete='off'
						required
						type='file'
						name='image'
						accept='image/*'
						multiple
						onChange={handleImageChange}
						className='lg:w-4/12 border-purple-200 mt-2 cursor-pointer'
					/>
					{errors && errors.images && (
						<p className='text-red-500'>Image is required</p>
					)}
					<div className='flex flex-wrap w-full'>
						{selectedImages.map((image, index) => (
							<div key={index} className='relative'>
								<img
									src={URL.createObjectURL(image)}
									alt={`Preview ${index}`}
									className='h-[100px] object-cover w-[100px] m-5'
								/>
								<span className='text-xl text-red-700 absolute cursor-pointer z-30 top-0 bg-white rounded-full -right-0'>
									<DoNotDisturbOnIcon
										onClick={() => handleRemoveSelectedImage(index)}
									/>
								</span>
							</div>
						))}
					</div>

					<div className='flex justify-left'>
						<input
							type='submit'
							value={'Add Achievement'}
							className='hover:bg-white bg-[#134391] font-semibold text-white transition-all duration-300 hover:text-[#134391] hover:border-[#134391] py-3 px-8 border border-transparent rounded cursor-pointer'
						/>
					</div>
				</form>


				{/* update Achievement  */}
				{/* {editableAchievement?._id && (
					<form
						onSubmit={handleSubmit(onUpdate)}
						className='flex flex-col gap-5 p-8'
					>
						<strong className='text-gray-500 text-lg'>*** Please ensure uploaded images do not exceed 1 MB in size for optimal website performance. ***</strong>
						<div className='flex lg:flex-row flex-col gap-5'>
							{renderTextField('achievementName', 'Achievement Name', {
								required: true,
							})}
						</div>
						<input
							autoComplete='off'
							required
							type='file'
							name='images'
							accept='image/*'
							multiple
							onChange={handleImageChange}
							className='lg:w-4/12 border-purple-200 mt-2 cursor-pointer'
						/>
						{errors && errors.images && (
							<p className='text-red-500'>Image is required</p>
						)}
						<div className='flex flex-wrap w-full'>
							{selectedImages.map((image, index) => (
								<div key={index} className='relative'>
									<img
										src={URL.createObjectURL(image)}
										alt={`Preview ${index}`}
										className='h-[100px] object-cover w-[100px] m-5'
									/>
									<span className='text-xl text-red-700 absolute cursor-pointer z-30 top-0 bg-white rounded-full -right-0'>
										<DoNotDisturbOnIcon
											onClick={() => handleRemoveSelectedImage(index)}
										/>
									</span>
								</div>
							))}
						</div>

						<div className='flex justify-left'>
							<input
								type='submit'
								value={'Update Achievement'}
								className='hover:bg-white bg-[#134391] font-semibold text-white transition-all duration-300 hover:text-[#134391] hover:border-[#134391] py-3 px-8 border border-transparent rounded cursor-pointer'
							/>
						</div>
					</form>
				)} */}
				<Toaster
					containerStyle={{ top: 100, left: 20, bottom: 20, right: 20 }}
				/>
			</div>

			{/* team list  */}
			<div className='relative overflow-x-auto shadow-md sm:rounded-lg mt-10 bg-white'>
				{/* Add search input */}
				<table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
					<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
						<tr>
							<th scope='col' className='px-6 py-3'>
								Achievement Image
							</th>
							<th scope='col' className='px-6 py-3'>
								Achievement Name
							</th>
							<th scope='col' className='px-6 py-3'>
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{filteredAchievements.map((achievement) => (
							<tr key={achievement._id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
								<td scope='row' className='flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'>
									<div className=''>
										<img
											className='w-20 h-20 object-cover rounded-md'
											src={achievement.image}
											alt='Achievement image'
										/>
									</div>
								</td>
								<td>{achievement.name}</td>
								<td className='px-6 text-center flex-grow md:flex-grow-0  py-4'>
									<a
										onClick={() => handleEditAchievement(achievement?._id)}
										className='font-medium text-[#134391] cursor-pointer'
									>
										<ModeEditIcon />
									</a>
									<span className='mx-5 my-1 block'>|</span>
									<a
										onClick={() => handleDeleteAchievement(achievement?._id)}
										className='font-medium text-red-500 hover:underline cursor-pointer'
									>
										<DeleteIcon />
									</a>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ManageAchievement;
