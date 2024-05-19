import { apiUrl } from './constant';

const createPropery = (formData, setLoading, toast, selectedImages) => {
	const create = async () => {
		try {
			// console.log(formData)
			const res = await fetch(`${apiUrl}/properties`, {
				method: 'POST',
				// headers: {
				// 	'Content-Type': 'Application/json',
				// },
				credentials: 'include',
				body: formData,
			});

			const data = await res.json();
			if (data.success) {
				toast.success('New property added');

				selectedImages([]);
			}
			// console.log(data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	create();
};

const updateProduct = (updatedData, id, setLoading, toast, setRefetch) => {
	const update = async () => {
		const dataType = typeof updatedData;
		try {
			let res;
			if (dataType !== 'string') {
				res = await fetch(`${apiUrl}/properties/${id}`, {
					method: 'PUT',
					credentials: 'include',
					body: updatedData,
				});
			} else {
				res = await fetch(`${apiUrl}/properties/${id}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'Application/json',
					},
					credentials: 'include',
					body: updatedData,
				});
			}
			const data = await res.json();
			if (data.success) {
				toast.success('Property Updated');
				setRefetch((prev) => !prev);
			}
		} catch (error) {
			toast.error('something went wrong');
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	update();
};

export { createPropery, updateProduct };
