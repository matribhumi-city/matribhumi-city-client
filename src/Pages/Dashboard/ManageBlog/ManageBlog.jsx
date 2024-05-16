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
import { data } from '../../../../public/data/data';
import { apiUrl } from '../../../ApiServices/constant';
import { updateBlog } from '../../../ApiServices/blogService';
import GridLoader from "react-spinners/GridLoader";

const ManageBlog = () => {
	// const blogs = data;

	const [blogs, setBlogs] = useState([]);
	// const [existingBlog, setExistingBlog] = useState(null);
	const [editableBlog, setEditableBlog] = useState(null);
	const [refetch, setRefetch] = useState(false);
	const [blogId, setBlogId] = useState('');

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm();
	const [selectedImages, setSelectedImages] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredBlogs, setFilteredBlogs] = useState([]);
	const [updatedData, setUpdatedData] = useState({});
	const [existingImage, setExistingImages] = useState([]);
	const [deletedImageUrls, setDeletedImageUrls] = useState([]);
	const [loading, setLoading] = useState(false);

	// Add the missing state initialization

	const onSubmit = async (data) => {
		// Handle other form data
		console.log('Other form data:', data);

		const formDataObj = new FormData();
		formDataObj.append('data', JSON.stringify(data));

		formDataObj.append('image', selectedImages[0]);

		try {
			const res = await fetch(`${apiUrl}/blogs`, {
				method: 'POST',
				// headers: {
				// 	'Content-Type': 'Application/json',
				// },
				credentials: 'include',
				body: formDataObj,
			});

			const data = await res.json();
			console.log(data)
			if (data.success) {
				toast.success('New blog added');

				setSelectedImages([]);
				reset();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleImageChange = (e) => {
		let files = e.target.files;

		// ... (existing code)

		setSelectedImages([files[0]]);
	};

	const onUpdate = (e) => {
		e.preventDefault();

		const form = e.target;
		// setLoading(true);

		const newFormData = {
			...updatedData,

			// imageUrls: existingImage,
			// deletedImages: deletedImageUrls.length && deletedImageUrls,
		};

		let formDataObj = new FormData();
		formDataObj.append('data', JSON.stringify(newFormData));
		// selectedImages.forEach((image) => {
		// formDataObj.append('image', selectedImages[0]);
		// });

		// formDataObj.append('image',iamge)
		if (!selectedImages.length) {
			formDataObj = JSON.stringify(newFormData);
		}
		updateBlog(JSON.stringify(updatedData), blogId, setLoading, toast, setRefetch);
	};

	const getBlogsToEdit = (id) => {
		fetch(`${apiUrl}/blogs/${id}`)
			.then((res) => res.json())
			.then((data) => {
				setEditableBlog(data.data);
				// setExistingImages(data.data.image);
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		getBlogsToEdit(blogId);
	}, [blogId]);

	console.log(editableBlog)

	const handleRemoveSelectedImage = (index) => {
		const images = [...selectedImages];
		const deletedImage = images.splice(index, 1);
		setSelectedImages(images);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		setUpdatedData({ ...updatedData, [name]: value });
	};

	// Set filteredProperties to show all properties by default
	useEffect(() => {
		setFilteredBlogs(blogs);
	}, [blogs]);
	useEffect(() => {
		setLoading(true)
		const getBlogs = async () => {
			try {
				const res = await fetch(`${apiUrl}/blogs`);

				const data = await res.json();
				console.log(data);
				if (data.success) {
					setBlogs(data.data);
					setFilteredBlogs(data.data);
					setLoading(false);
				}
			} catch (error) {
				// console.log(error);
				setLoading(true)
			}
		};
		getBlogs();
	}, [refetch]);


	const handleDeleteProperty = (id) => {
		const confirm = window.confirm(
			'Are you sure you want to delete this property'
		);

		if (!confirm) return;

		fetch(`${apiUrl}/blogs/${id}`, { method: 'DELETE' })
			.then((res) => res.json())
			.then((data) => {
				if (data.suceess) {
					toast.success('Blog deleted');
				}
			})
			.catch((err) => {
				toast.error(err.message);
			})
			.finally(() => {
				setRefetch(!refetch);
			});
	};

	const handleSearchChange = (e) => {
		const term = e.target.value;
		setSearchTerm(term);

		if (term.trim() === '') {
			setFilteredBlogs(blogs);
		} else {
			const filteredBlogs = blogs.filter((blog) =>
				blog.headline?.toLowerCase().includes(term?.toLowerCase())
			);
			setFilteredBlogs(filteredBlogs);
		}
	};

	return (
		<div className='min-h-screen animate__animated animate__fadeIn'>
			<Helmet>
				<title>Manage Blog - Matribhumi City Admin</title>
				<meta
					name='description'
					content='Explore Matribhumi City, a prime housing venture near Nimtala. Discover our meticulously planned Smart City with essential amenities, flexible plots, and a strategic location in Dhaka-Mawa highway.'
				/>
			</Helmet>
			{/* add blog  */}

			<div className='bg-white rounded-md'>
				<div className='flex items-center'>
					<h2 className='font-semibold text-xl px-8 py-5'>{(editableBlog?._id) ? 'Update Blog' : 'Add Blog'}</h2>
					{editableBlog?._id &&
						<button onClick={() => setEditableBlog(null)} className='bg-transparent hover:bg-[#134391] font-semibold hover:text-white transition-all duration-300 hover:border-[#134391] py-2 px-5 border rounded cursor-pointer'>Add Blog</button>
					}
				</div>
				<hr />
				{!editableBlog?._id && (
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='flex flex-col gap-5 p-8'
					>
						<strong className='text-gray-500 text-lg'>*** Please ensure uploaded images do not exceed 1 MB in size for optimal website performance. ***</strong>
						<div className='flex lg:flex-row flex-col gap-5'>
							<div className='w-full'>
								{' '}
								<label htmlFor='' className=''>
									Blog Title
								</label>
								<br />
								<input
									className='border rounded px-3 py-3 w-full mt-2'
									type='text'
									{...register('title', { required: true })}
								/>
							</div>
							{/* <div className=' w-full'>
								<label htmlFor='' className=''>
									Date
								</label>
								<input
									{...register('date', { required: true })}
									className='border rounded px-2 py-3 w-full mt-2'
									type='date'
								/>
							</div> */}
						</div>
						<textarea
							name=''
							className='w-full border px-3 py-5 rounded'
							placeholder='Description'
							id=''
							cols='30'
							rows='5'
							{...register('description', { required: true })}
						></textarea>
						<input
							autoComplete='off'
							required
							type='file'
							name='images'
							accept='image/*'
							// multiple
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
								className='hover:bg-white bg-[#134391] font-semibold text-white transition-all duration-300 hover:text-[#134391] hover:border-[#134391] py-3 px-8 border border-transparent rounded cursor-pointer'
							/>
						</div>
					</form>
				)}

				{/* blog Update form */}
				{editableBlog?._id && (
					<form
						onSubmit={onUpdate}
						className='flex flex-col gap-5 p-8'
					>
						<strong className='text-gray-500 text-lg'>*** Please ensure uploaded images do not exceed 1 MB in size for optimal website performance. ***</strong>
						<div className='flex lg:flex-row flex-col gap-5'>
							<div className='w-full'>
								{' '}
								<label htmlFor='' className=''>
									Blog Title
								</label>
								<br />
								<input
									name='title'
									onChange={handleInputChange}
									className='border rounded px-3 py-3 w-full mt-2'
									type='text'
									defaultValue={editableBlog?.title}
								/>
							</div>
							{/* <div className=' w-full'>
									<label htmlFor='' className=''>
										Date
									</label>
									<input
										// onChange={handleInputChange}
										className='border rounded px-2 py-3 w-full mt-2'
										type='date'
									/>
								</div> */}
						</div>
						<textarea
							onChange={handleInputChange}
							defaultValue={editableBlog?.description}
							name='description'
							className='w-full border px-3 py-5 rounded'
							placeholder='Description'
							id=''
							cols='30'
							rows='5'
						></textarea>
						{/* <input

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
						)} */}
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
								value={'Update'}
								className='hover:bg-white bg-[#134391] font-semibold text-white transition-all duration-300 hover:text-[#134391] hover:border-[#134391] py-3 px-8 border border-transparent rounded cursor-pointer'
							/>
						</div>
					</form>
				)}
				<Toaster
					containerStyle={{ top: 100, left: 20, bottom: 20, right: 20 }}
				/>
			</div>

			{/* blog list  */}
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
							placeholder='Search for blog'
							value={searchTerm}
							onChange={handleSearchChange}
						/>
					</div>
				</div>
				<table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
					<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
						<tr>
							<th scope='col' className='px-6 py-3'>
								Blog Image
							</th>
							<th scope='col' className='px-6 py-3'>
								Blog Title
							</th>
							<th scope='col' className='px-6 py-3'>
								Date
							</th>
							<th scope='col' className='px-6 py-3'>
								Action
							</th>
						</tr>
					</thead>
					{loading ?
						<div className="animate__animated animate__heartBeat  animate__slower 3s">
							{/* <img src={logo} className="lg:w-10/12 w-8/12 mx-auto" alt="Matribhumi City" /> */}
							<GridLoader
								color="white"
								// loading={loading}
								size={20}
								aria-label="Loading Spinner"
								data-testid="loader"
							/>
						</div>
						:
						<tbody>
							{filteredBlogs.length > 0 ? (
								filteredBlogs.map((item) => {
									const originalDate = new Date(item?.createdAt);
									const options = { timeZone: "Asia/Dhaka" };
									return (
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
														alt='Jese image'
													/>
												</div>
											</th>
											<td className='px-6 py-4'>{item?.title}</td>
											<td className='px-6 py-4'>{originalDate.toLocaleString("en-US", options)}</td>
											<td className='px-6 text-center flex-grow md:flex-grow-0  py-4'>
												<a
													onClick={() => setBlogId(item._id)}
													type='button'
													data-modal-target='editUserModal'
													data-modal-show='editUserModal'
													className='font-medium text-[#134391] '
												>
													<ModeEditIcon className='cursor-pointer' />
												</a>
												<span className='mx-5 my-1 block'>|</span>
												<a
													onClick={() => handleDeleteProperty(item._id)}
													type='button'
													data-modal-target='editUserModal'
													data-modal-show='editUserModal'
													className='font-medium text-red-500 dark:text-blue-500 hover:underline'
												>
													<DeleteIcon className='text-red-500 cursor-pointer' />
												</a>
											</td>
										</tr>
									)
								})
							) : (
								<tr>
									<td colSpan='8' className='px-6 py-4 text-center'>
										No Blog found.
									</td>
								</tr>
							)}
						</tbody>
					}
				</table>
			</div>
		</div>
	);
};

export default ManageBlog;
