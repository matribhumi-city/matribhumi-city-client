import React from 'react';
import './MainLoading.css';

const MainLoading = () => {
	return (
		<div className='fixed top-0 left-0 bottom-0 bg-[#3B95B0] right-0 flex flex-col justify-center items-center'>
			<h2 className='text-2xl my-5 font-bold'>
				Please wait server taking time...
			</h2>

			<span className='loader'></span>
		</div>
	);
};

export default MainLoading;
