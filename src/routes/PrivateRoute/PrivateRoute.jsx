import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import GridLoader from 'react-spinners/GridLoader';
import toast from 'react-hot-toast';

// Import the MainLoading component for the loading state.

// AdminRoutes Component: A route guard for admin-only routes.
const AdminRoutes = ({ children }) => {
	// Get the current route location.
	const location = useLocation();

	// Retrieve user data from Redux store.
	const userData = useSelector((state) => state.user);
	const { user, status, isAuthenticated } = userData;

	// Check if the user is authenticated and their profile has loaded.

	if (status === 'loading') {
		return (
			<div className='animateanimated animateheartBeat  animate__slower 3s'>
				{/* <img src={logo} className="lg:w-10/12 w-8/12 mx-auto" alt="Matribhumi City" /> */}
				<GridLoader
					color='white'
					// loading={}
					size={20}
					aria-label='Loading Spinner'
					data-testid='loader'
				/>
			</div>
		);
	}

	// Check if the user is an admin with the 'admin' role.
	if (user?.isAdmin && user?.role === 'admin' && isAuthenticated) {
		// User is authenticated and has admin privileges.
		return children;
	} else {
		// Redirect to the login page with the original route as state.
		toast.error('Only admin can access the Dashboard');
		return <Navigate to='/login' state={{ from: location }} replace />;
	}
};

export default AdminRoutes;
