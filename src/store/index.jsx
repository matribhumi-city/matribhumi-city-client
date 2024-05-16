import { configureStore } from '@reduxjs/toolkit';
// import { userSlice } from "./slices/UserSlices";
import UserSlices, { fetchUserProfile } from './slices/UserSlices.jsx';

const store = configureStore({
	reducer: {
		user: UserSlices,
	},
});
store.dispatch(fetchUserProfile());
// store.dispatch(fetchCategories());
export default store;
