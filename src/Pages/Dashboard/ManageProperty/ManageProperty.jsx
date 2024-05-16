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
import imageCompression from 'browser-image-compression';
import {
	createPropery,
	updateProduct,
} from '../../../ApiServices/PropertyService';
import { apiUrl } from '../../../ApiServices/constant';
import GridLoader from "react-spinners/GridLoader";

const ManageProperty = () => {
	const [selectedImages, setSelectedImages] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredProperties, setFilteredProperties] = useState([]);
	const [properties, setProperties] = useState([]);
	const [existingProperty, setExistingProperty] = useState(null);
	const [refetch, setRefetch] = useState(false);
	const [existingImage, setExistingImages] = useState([]);
	const [deletedImageUrls, setDeletedImageUrls] = useState([]);

	// Add the missing state initialization
	const [propertyType, setPropertyType] = useState('');
	const [propertyFace, setPropertyFace] = useState('');
	const [sector, setSector] = useState('');
	const [status, setStatus] = useState('');
	const [block, setBlock] = useState('');
	const [road, setRoad] = useState('');
	const [loading, setLoading] = useState(false);
	const [propertyId, setPropertyId] = useState('');
	const [updatedData, setUpdatedData] = useState({});

	const {
		register,
		handleSubmit,
		reset,
		setValue,

		formState: { errors },
	} = useForm();

	const compressImage = async (imageFile) => {
		const options = {
			maxSizeMB: 1, // Set the maximum size to 1 MB
			maxWidthOrHeight: 1920,
			useWebWorker: true,
		};

		try {
			const compressedFile = await imageCompression(imageFile, options);
			return compressedFile;
		} catch (error) {
			console.error('Image compression error:', error);
			throw error;
		}
	};

	const onSubmit = async (data) => {
		// Handle other form data
		// console.log('Other form data:', data);

		// Compress and handle image files
		const formDataObj = new FormData();

		// Compress and append images to FormData
		const compressedImages = await Promise.all(
			selectedImages.map(async (image) => {
				const compressedImage = await compressImage(image);
				console.log(compressedImage)
				return compressedImage;
			})
		);
		
		compressedImages.forEach((compressedImage) => {
			formDataObj.append('images', compressedImage);
		});

		// Handle other form data
		formDataObj.append('data', JSON.stringify(data));

		// Call the API function to create property
		createPropery(formDataObj, setLoading, toast, setSelectedImages);
		reset();
		setRefetch(!refetch);
	};

	const onUpdate = async (e) => {
		e.preventDefault();

		const form = e.target;

		const newFormData = {
			...updatedData,
			imageUrls: existingImage,
			deletedImages: deletedImageUrls.length && deletedImageUrls,
		};

		let formDataObj = new FormData();

		try {
			// Compress and append images to FormData
			const compressedImages = await Promise.all(
				selectedImages.map(async (image) => {
					const compressedImage = await compressImage(image);
					console.log(compressedImage)
					return compressedImage;
				})
			);

			console.log(compressedImages)
			
			compressedImages.forEach((compressedImage) => {
				console.log(compressedImage)
				formDataObj.append('images', compressedImage);
			});
		} catch (error) {
			// Handle error, show a message, etc.
			console.error('Error during image compression:', error);
		}

		// Handle other form data
		formDataObj.append('data', JSON.stringify(newFormData));

		// Call the API function to update property
		updateProduct(formDataObj, propertyId, setLoading, toast, setRefetch);
	};


	const handleInputChange = (e) => {
		const { name, value } = e.target;

		setUpdatedData({ ...updatedData, [name]: value });
	};
	const handleSelectChange = (e) => {
		const { name, value } = e.target;
		setUpdatedData({ ...updatedData, [name]: value });
		setValue(name, value);
	};

	const handleImageChange = (e) => {
		let files = e.target.files;
		setSelectedImages([...selectedImages, ...files]);
	};

	const handleRemoveSelectedImage = (index) => {
		const images = [...selectedImages];
		const deletedImage = images.splice(index, 1);
		setSelectedImages(images);
	};

	const handleRemoveAxistingImage = (index) => {
		const images = [...existingImage];
		const [deletedImage] = images.splice(index, 1);
		setDeletedImageUrls([...deletedImageUrls, deletedImage]);
		setExistingImages(images);
	};

	// Set filteredProperties to show all properties by default
	useEffect(() => {
		setLoading(true);
		fetch(`${apiUrl}/properties`)
			.then((res) => res.json())
			.then((data) => {
				setFilteredProperties(data.data);
				setProperties(data.data);
				if (data?.success) {
					setLoading(false);
				} else {
					setLoading(true);
				}
			})
			.catch((error) => console.log(error));
		// setFilteredProperties(propertys);
	}, [refetch]);

	const handleSearchChange = (e) => {
		const term = e.target.value;
		setSearchTerm(term);

		// Filter properties based on the search term
		if (term.trim() === '') {
			// If search term is empty, show all properties
			setFilteredProperties(properties);
		} else {
			const filteredProps = properties.filter((property) =>
				property.propertyTitle.toLowerCase().includes(term.toLowerCase())
			);
			setFilteredProperties(filteredProps);
		}
	};

	const handleDeleteProperty = (id) => {
		const confirm = window.confirm(
			'Are you sure you want to delete this property'
		);

		if (!confirm) return;

		fetch(`${apiUrl}/properties/${id}`, { method: 'DELETE' })
			.then((res) => res.json())
			.then((data) => {
				if (data.suceess) {
					toast.success('Property deleted');
				}
			})
			.catch((err) => {
				toast.error(err.message);
			})
			.finally(() => {
				setRefetch(!refetch);
			});
	};

	const getPropertyToEdit = (id) => {
		fetch(`${apiUrl}/properties/${id}`)
			.then((res) => res.json())
			.then((data) => {
				setExistingProperty(data.data);
				setExistingImages(data.data.propertyImage.slideImages);
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		getPropertyToEdit(propertyId);
	}, [propertyId]);

	const renderSelect = (name, label, state, setState, options, validation) => (
		<FormControl fullWidth size='small' sx={{ minHeight: '60px' }}>
			<InputLabel>{label}</InputLabel>
			<Select
				{...register(name, validation)}
				value={state}
				onChange={(e) => setState(e.target.value)}
				label={label}
				sx={{ minHeight: '100%' }}
			>
				<MenuItem value='' disabled>
					<em>{label}</em>
				</MenuItem>
				{options.map((value) => (
					<MenuItem key={value} value={value}>
						{value}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);

	const renderTextField = (name, label, validation, defaultValue) => {

		return (
			<TextField
				{...register(name, validation)}
				fullWidth
				label={label}
				sx={{ minHeight: '60px' }}
				defaultValue={defaultValue}
			/>
		);
	};

	console.log(existingProperty);

	return (
		<div className='min-h-screen animate__animated animate__fadeIn'>
			{/* add existingProperty  */}
			{!existingProperty?._id && (
				<div className='bg-white rounded-md'>
					<h2 className='font-semibold text-xl px-8 py-5'>Add Property</h2>
					<hr />
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='flex flex-col gap-5 p-8'
					>
						<strong className='text-gray-500 text-lg'>*** Please ensure uploaded images do not exceed 1 MB in size for optimal website performance. ***</strong>
						<div className='flex lg:flex-row flex-col gap-5'>
							{renderTextField('propertyTitle', 'Property Title', {
								required: !existingProperty,
							})}
							{renderSelect(
								'propertyType',
								'Property Type',
								propertyType,
								setPropertyType,
								['Residential Zone', 'Commercial Zone', 'Atlantic zone', 'Southern zone', 'Pacific zone', 'VIP Plot', 'Leck View Plot'],
								{ required: !existingProperty }
							)}
							{renderSelect(
								'propertyFace',
								'Property Face',
								propertyFace,
								setPropertyFace,
								['North', 'South', 'East', 'West'],
								{ required: !existingProperty }
							)}
						</div>
						<div className='flex lg:flex-row flex-col gap-5'>
							{renderTextField(
								'location',
								'Property Location',
								{
									required: !existingProperty,
								},
								existingProperty ? existingProperty.location : ''
							)}
							{renderTextField('propertyArea', 'Property Area', {
								required: !existingProperty,
							})}
						</div>
						<div className='flex lg:flex-row flex-col gap-5'>
							{renderTextField('propertySize', 'Property Size', {
								required: !existingProperty,
							})}
							{renderTextField('propertyPrice', 'Property Price', {
								required: !existingProperty,
							})}
						</div>
						<div className='flex lg:flex-row flex-col gap-5'>
							{renderSelect(
								'sector',
								'Sector',
								sector,
								setSector,
								['1', '2', '3'],
								{ required: !existingProperty }
							)}
							{renderSelect(
								'status',
								'Status',
								status,
								setStatus,
								['available', 'sold-out'],
								{ required: !existingProperty }
							)}
							{renderSelect(
								'block',
								'Block',
								block,
								setBlock,
								['Block A - Kingdom', 'Block B - Oakland', 'Block C - Empire', 'Block D - Dynasty', 'Block A - Maple', 'Block B - M Valley', 'Block D - M Valley', 'Block C - Legacy', 'Block A - Pavilion', 'Block B - Horizon', 'Block C - Francisco', 'Block D - Mermaid', 'Aristocrat', 'Orchard', 'Beach Front'],
								{ required: !existingProperty }
							)}
							{/* road problem select and number */}
							{renderTextField(
								'road',
								'Road',
								{ required: !existingProperty })}
						</div>
						<TextareaAutosize
							{...register('description', { required: !existingProperty })}
							fullWidth
							style={{
								width: '100%',
								minHeight: '100px',
								border: '1px solid #ccc',
								borderRadius: '4px',
								padding: '8px',
							}}
							placeholder='Property Description'
						/>
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
							{existingProperty &&
								existingImage?.map((image, index) => (
									<div key={index} className='relative'>
										<img
											src={image}
											alt={`Preview ${index}`}
											className='h-[100px] object-cover w-[100px] m-5'
										/>
										<span className='text-xl text-red-700 absolute cursor-pointer z-30 top-0 bg-white rounded-full -right-0'>
											<DoNotDisturbOnIcon
												onClick={() => handleRemoveAxistingImage(index)}
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
					<Toaster
						containerStyle={{ top: 100, left: 20, bottom: 20, right: 20 }}
					/>
				</div>
			)}

			{existingProperty?._id && (
				<div className='bg-white rounded-md'>
					<h2 className='font-semibold text-xl px-8 py-5'>Update Property</h2>
					<hr />
					<form onSubmit={onUpdate} className='flex flex-col gap-5 p-8'>
						<div className='flex md:flex-row flex-col gap-5'>
							<div className='w-full'>
								{' '}
								<label htmlFor='' className=''>
									Property Title
								</label>
								<br />
								<input
									name='propertyTitle'
									onChange={handleInputChange}
									className='border rounded px-3 py-3 w-full mt-2'
									type='text'
									defaultValue={existingProperty?.propertyTitle}
								/>
							</div>
							<div className=' w-full'>
								<label htmlFor='' className=''>
									Property Type
								</label>
								<input
									name='propertyType'
									onChange={handleInputChange}
									className='border rounded px-2 py-3 w-full mt-2'
									type='text'
									defaultValue={existingProperty.propertyType}
								/>
							</div>
							<div className=' w-full'>
								<label htmlFor='' className=''>
									Property Face
								</label>
								<input
									name='propertyFace'
									onChange={handleInputChange}
									className='border rounded px-2 py-3 w-full mt-2'
									type='text'
									defaultValue={existingProperty.propertyFace}
								/>
							</div>
						</div>
						<div className='flex md:flex-row flex-col gap-5'>
							<div className='w-full'>
								{' '}
								<label htmlFor='' className=''>
									Property Location
								</label>
								<br />
								<input
									name='location'
									onChange={handleInputChange}
									className='border rounded px-3 py-3 w-full mt-2'
									type='text'
									defaultValue={existingProperty.location}
								/>
							</div>
							<div className='flex flex-col w-full'>
								<label htmlFor='' className=''>
									Property Area
								</label>
								<input
									name='propertyArea'
									onChange={handleInputChange}
									className='border rounded px-2 py-3 w-full mt-2'
									type='text'
									defaultValue={existingProperty.propertyArea}
								/>
							</div>
						</div>
						<div className='flex md:flex-row flex-col gap-5'>
							<div className='w-full'>
								{' '}
								<label htmlFor='' className=''>
									Property Size
								</label>
								<br />
								<input
									name='propertySize'
									onChange={handleInputChange}
									className='border rounded px-3 py-3 w-full mt-2'
									type='text'
									defaultValue={existingProperty.propertySize}
								/>
							</div>
							<div className='flex flex-col w-full'>
								<label htmlFor='' className=''>
									Property Price
								</label>
								<input
									name='propertyTitle'
									onChange={handleInputChange}
									className='border rounded px-2 py-3 w-full mt-2'
									type='text'
									defaultValue={existingProperty.propertyPrice}
								/>
							</div>
						</div>
						<div className='flex md:flex-row flex-col gap-5'>
							<div className='w-full'>
								{' '}
								<label htmlFor='' className=''>
									Sector
								</label>
								<br />
								<input
									name='sector'
									onChange={handleInputChange}
									className='border rounded px-3 py-3 w-full mt-2'
									type='text'
									defaultValue={existingProperty.sector}
								/>
							</div>
							<div className='flex flex-col w-full'>
								<label htmlFor='' className=''>
									Stutas
								</label>

								<select
									{...register('status', { required: !existingProperty })}
									defaultValue={existingProperty.status}
									onChange={handleSelectChange}
									className='border rounded px-2 py-3 w-full h-auto mt-2'
								>
									<option value='available'>Available</option>
									<option value='sold-out'>Sold Out</option>
								</select>

							</div>
							<div className='w-full'>
								{' '}
								<label htmlFor='' className=''>
									Block
								</label>
								<br />
								<input
									name='block'
									onChange={handleInputChange}
									className='border rounded px-3 py-3 w-full mt-2'
									type='text'
									defaultValue={existingProperty.block}
								/>
							</div>
							<div className='flex flex-col w-full'>
								<label htmlFor='' className=''>
									Road
								</label>
								<input
									name='road'
									onChange={handleInputChange}
									className='border rounded px-2 py-3 w-full mt-2'
									type='text'
									defaultValue={existingProperty.road}
								/>
							</div>
						</div>
						<textarea
							name='description'
							onChange={handleInputChange}
							className='w-full border px-3 py-5 rounded'
							placeholder='Description'
							defaultValue={existingProperty.description}
							id=''
							cols='30'
							rows='5'
						></textarea>
						
						<input
							autoComplete='off'
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
							{existingProperty &&
								existingImage?.map((image, index) => (
									<div key={index} className='relative'>
										<img
											src={image}
											alt={`Preview ${index}`}
											className='h-[100px] object-cover w-[100px] m-5'
										/>
										<span className='text-xl text-red-700 absolute cursor-pointer z-30 top-0 bg-white rounded-full -right-0'>
											<DoNotDisturbOnIcon
												onClick={() => handleRemoveAxistingImage(index)}
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
					<Toaster
						containerStyle={{ top: 100, left: 20, bottom: 20, right: 20 }}
					/>
				</div>
			)}

			{/* property list  */}
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
							placeholder='Search for property'
							value={searchTerm}
							onChange={handleSearchChange}
						/>
					</div>
				</div>
				<table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
					<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
						<tr>
							<th scope='col' className='px-6 py-3'>
								Image
							</th>
							<th scope='col' className='px-6 py-3'>
								Title
							</th>
							<th scope='col' className='px-6 py-3'>
								Location
							</th>
							<th scope='col' className='px-6 py-3'>
								Size
							</th>
							<th scope='col' className='px-6 py-3'>
								Type
							</th>
							<th scope='col' className='px-6 py-3'>
								Status
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
							{filteredProperties.length > 0 ? (
								filteredProperties.map((item) => (
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
													src={item?.propertyImage?.mainImage}
													alt='Jese image'
												/>
											</div>
										</th>
										<td className='px-6 py-4'>{item?.propertyTitle}</td>
										<td className='px-6 py-4'>{item?.location}</td>
										<td className='px-6 py-4'>{item?.propertySize}</td>
										<td className='px-6 py-4'>{item?.propertyType}</td>
										<td className='px-6 py-4'>
											<span
												className={`text-sm text-[10px] ${item?.status == 'sold-out'
													? 'bg-red-600 text-white'
													: 'bg-white'
													} border text-gray-500 p-1 rounded-sm capitalize`}
											>
												{item?.status}
											</span>
											{/* <div className={`flex items-center ${(item?.propertyStatus == 'sold out')? 'bg-red-600':''}`}>
                                            {item?.propertyStatus} 
                                        </div> */}
										</td>
										<td className='px-6 text-center flex-grow md:flex-grow-0  py-4'>
											<a
												onClick={() => setPropertyId(item._id)}
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
								))
							) : (
								<tr>
									<td colSpan='8' className='px-6 py-4 text-center'>
										No properties found.
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

export default ManageProperty;
