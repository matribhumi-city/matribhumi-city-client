import React, { useEffect, useState } from 'react';
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
import imageCompression from 'browser-image-compression'; // Make sure to import image compression library

const ManageTeam = () => {
	const [teams, setTeams] = useState([]);
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm();
	const [selectedImages, setSelectedImages] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredTeams, setFilteredTeams] = useState([]);
	const [editingTeam, setEditingTeam] = useState(null);

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
			if (editingTeam) {
				await updateTeamMember(data);
			} else {
				await addNewTeamMember(data);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const addNewTeamMember = async (data) => {
		try {
			const compressedImage = await compressImage(selectedImages[0]);

			const formDataObj = new FormData();
			formDataObj.append('data', JSON.stringify(data));
			formDataObj.append('image', compressedImage);

			const res = await fetch(`${apiUrl}/teams`, {
				method: 'POST',
				credentials: 'include',
				body: formDataObj,
			});

			const responseData = await res.json();

			if (responseData.success) {
				toast.success('New team member added');
				setSelectedImages([]);
				reset();
			}
		} catch (error) {
			console.error('Error adding new team member:', error);
		}
	};

	const updateTeamMember = async (data) => {
		try {
			const compressedImage = await compressImage(selectedImages[0]);

			const formDataObj = new FormData();
			formDataObj.append('data', JSON.stringify(data));
			formDataObj.append('image', compressedImage);


			const res = await fetch(`${apiUrl}/teams/${editingTeam._id}`, {
				method: 'PUT',
				credentials: 'include',
				body: formDataObj,
			});

			const responseData = await res.json();

			if (responseData.success) {
				toast.success('Team member updated');
				setEditingTeam(null);
				setSelectedImages([]);
				reset();
			}
		} catch (error) {
			console.error('Error updating team member:', error);
		}
	};

	const handleImageChange = (e) => {
		let files = e.target.files;
		setSelectedImages([...selectedImages, ...files]);
	};

	useEffect(() => {
		const fetchTeams = async () => {
			try {
				const response = await fetch(`${apiUrl}/teams`);
				const data = await response.json();
				setTeams(data.data);
				setFilteredTeams(data.data);
			} catch (error) {
				console.error('Error while fetching teams:', error);
			}
		};

		fetchTeams();
	}, []);

	useEffect(() => {
		setFilteredTeams(teams);
	}, [teams]);

	const handleSearchChange = (e) => {
		const term = e.target.value;
		setSearchTerm(term);

		if (term.trim() === '') {
			setFilteredTeams(teams);
		} else {
			const filteredTeams = teams?.filter((member) =>
				member.name.toLowerCase().includes(term.toLowerCase())
			);
			setFilteredTeams(filteredTeams);
		}
	};

	const renderTextField = (name, label, validation) => (
		<TextField
			{...register(name, validation)}
			fullWidth
			label={label}
			sx={{ minHeight: '60px' }}
		/>
	);

	const handleEditTeam = (team) => {
		setEditingTeam(team);
		setValue('name', team.name);
		setValue('role', team.role);
		// Additional fields if needed

		// If the team member has an image, set it as the selected image for editing
		if (team.image) {
			setSelectedImages([team.image]);
		}
	};

	const handleDeleteTeam = async (teamId) => {
		const confirm = window.confirm(
			'Are you sure you want to delete this team member?'
		);

		if (confirm) {
			try {
				const response = await fetch(`${apiUrl}/teams/${teamId}`, {
					method: 'DELETE',
				});

				if (response.ok) {
					console.log('Team member deleted successfully');
					toast.success('Team member deleted successfully', {
						position: 'top-center',
					});
				} else {
					console.error('Failed to delete team member');
					toast.error('Failed to delete team member', {
						position: 'top-center',
					});
				}
			} catch (error) {
				console.error('Error while deleting team member:', error);
			}
		}
	};

	const handleRemoveSelectedImage = (index) => {
		const images = [...selectedImages];
		images.splice(index, 1);
		setSelectedImages(images);
	};

	return (
		<div className='min-h-screen animate__animated animate__fadeIn'>
			<Helmet>
				<title>Manage team - Matribhumi City Admin</title>
				<meta
					name='description'
					content='Explore Matribhumi City, a prime housing venture near Nimtala. Discover our meticulously planned Smart City with essential amenities, flexible plots, and a strategic location in Dhaka-Mawa highway.'
				/>
			</Helmet>
			{/* Add/Edit Team Form */}
			<div className='bg-white rounded-md'>
				<h2 className='font-semibold text-xl px-8 py-5'>
					{editingTeam ? 'Edit Team Member' : 'Add Team Member'}
				</h2>
				<hr />
				<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 p-8'>
					<strong className='text-gray-500 text-lg'>*** Please ensure uploaded images do not exceed 1 MB in size for optimal website performance. ***</strong>
					<div className='flex lg:flex-row flex-col gap-5'>
						{renderTextField('name', 'Member Name', { required: true })}
						{renderTextField('role', 'Member Position', {
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
									src={image instanceof Blob ? URL.createObjectURL(image) : image}
									alt={`Preview ${index}`}
									className='h-[100px] object-cover w-[100px] m-5'
								/>

								<span className='text-xl text-red-700 absolute cursor-pointer z-30 top-0 bg-white rounded-full -right-0'>
									<DoNotDisturbOnIcon onClick={() => handleRemoveSelectedImage(index)} />
								</span>
							</div>
						))}
					</div>
					<div className='flex justify-left'>
						<input
							type='submit'
							value={editingTeam ? 'Update' : 'Add Member'}
							className='hover:bg-white bg-[#134391] font-semibold text-white transition-all duration-300 hover:text-[#134391] hover:border-[#134391] py-3 px-8 border border-transparent rounded cursor-pointer'
						/>
					</div>
				</form>
				<Toaster containerStyle={{ top: 100, left: 20, bottom: 20, right: 20 }} />
			</div>

			{/* Team List */}
			<div className='relative overflow-x-auto shadow-md sm:rounded-lg mt-10 bg-white'>
				<div className='flex justify-center flex-column my-5 w-6/12 mx-auto'>
					<div className='relative w-full'>
						<span className='absolute left-3 top-1 text-gray-500'>
							<SearchIcon />
						</span>
						<input
							type='text'
							id='table-search-users'
							className='block py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full'
							placeholder='Search for team member'
							value={searchTerm}
							onChange={handleSearchChange}
						/>
					</div>
				</div>
				<table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
					<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
						<tr>
							<th scope='col' className='px-6 py-3'>
								Member Image
							</th>
							<th scope='col' className='px-6 py-3'>
								Member Name
							</th>
							<th scope='col' className='px-6 py-3'>
								Position
							</th>
							<th scope='col' className='px-6 py-3'>
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{filteredTeams.length > 0 ? (
							filteredTeams.map((item) => (
								<tr
									key={item?._id}
									className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
								>
									<th
										scope='row'
										className='flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'
									>
										<div className=''>
											<img
												className='w-20 h-20 object-cover rounded-md'
												src={item?.image}
												alt='Team member image'
											/>
										</div>
									</th>
									<td className='px-6 py-4'>{item?.name}</td>
									<td className='px-6 py-4'>{item?.role}</td>
									<td className='px-6 text-center flex-grow md:flex-grow-0  py-4'>
										<a
											type='button'
											onClick={() => handleEditTeam(item)}
											className='font-medium text-[#134391] '
										>
											<ModeEditIcon className='cursor-pointer' />
										</a>
										<span className='mx-5 my-1 block'>|</span>
										<a
											type='button'
											onClick={() => handleDeleteTeam(item?._id)}
											className='font-medium text-red-500 dark:text-blue-500 hover:underline'
										>
											<DeleteIcon className='text-red-500 cursor-pointer' />
										</a>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan='4' className='px-6 py-4 text-center'>
									No matching team members found.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ManageTeam;
