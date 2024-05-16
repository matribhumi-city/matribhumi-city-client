import { apiUrl } from './constant';

const updateBlog = (updatedData, id, setLoading, toast, setRefetch) => {
	const update = async () => {
		const dataType = typeof updatedData;
		try {
			let res;
			if (dataType !== 'string') {
				res = await fetch(`${apiUrl}/blogs/${id}`, {
					method: 'PUT',
					credentials: 'include',
					body: updatedData,
				});
			} else {
				res = await fetch(`${apiUrl}/blogs/${id}`, {
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
				toast.success('Blog Updated');
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

export { updateBlog };