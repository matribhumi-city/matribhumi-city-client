import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import Home from '../Pages/Home/Home';
import About from '../Pages/About/About';
import Blog from '../Pages/Blog/Blog';
import Career from '../Pages/Career/Career';
import OurAchievement from '../Pages/About/OurAchievement/OurAchievement';
import Contact from '../Pages/Contact/Contact';
import SingleblogDetails from '../Pages/blog/SingleblogDetails/SingleblogDetails';
import Properties from '../Pages/Properties/Properties';
import NotFound from '../Pages/NotFound/NotFound';
import ProjectLayout from '../Pages/Properties/ProjectLayout/ProjectLayout';
import SinglePlots from '../Pages/Properties/Plot/SinglePlots/SinglePlots';
import FeatureAminity from '../Pages/Properties/FeatureAminity/FeatureAminity';
import Team from '../Pages/About/Team/Team';
import BookVisit from '../Pages/BookVisit/BookVisit';
import MissionVission from '../Pages/About/Mission&Vission/MissionVission';
import OurStory from '../Pages/About/OurStory/OurStory';
import Dashboard from '../Pages/Dashboard/Dashboard';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import MainDashboard from '../Pages/Dashboard/MainDashboard/MainDashboard';
import ManageBlog from '../Pages/Dashboard/ManageBlog/ManageBlog';
import ManageTeam from '../Pages/Dashboard/ManageTeam/ManageTeam';
import ManageProperty from '../Pages/Dashboard/ManageProperty/ManageProperty';
import ManageAchievement from '../Pages/Dashboard/ManageAchievement/ManageAchievement';
import ManageContact from '../Pages/Dashboard/ManageContact/ManageContact';
import SingIn from '../Pages/Dashboard/SingIn/SingIn';
import ManageBooking from '../Pages/Dashboard/ManageBooking/ManageBooking';
import ManageBookVisit from '../Pages/Dashboard/ManageBookVisit/ManageBookVisit';
import ManageCareer from '../Pages/Dashboard/ManageCareer/ManageCareer';
import Concerns from '../Pages/Concerns/Concerns';
import Privacy from '../Pages/Privacy/Privacy';
import ForgetPasswordRequest from '../Auth/ForgetPassword/ForgetPasswordRequest';
import ForgetPassword from '../Auth/ForgetPassword/ForgetPassword';
import Login from '../Auth/Login/Login';
import SignUp from '../Auth/SignUp/SignUp';
import ManageUsers from '../Pages/Dashboard/ManageUsers/ManageUsers';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Main />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/about',
				element: <About />,
			},
			{
				path: '/our-Story',
				element: <OurStory />,
			},
			{
				path: '/mission-vission',
				element: <MissionVission />,
			},
			{
				path: '/concerns',
				element: <Concerns />,
			},
			{
				path: '/our-achievement',
				element: <OurAchievement />,
			},
			{
				path: '/team',
				element: <Team />,
			},
			{
				path: '/properties',
				element: <Properties />,
			},
			{
				path: '/plot/:id',
				element: <SinglePlots />,
			},
			{
				path: '/porject-layout',
				element: <ProjectLayout />,
			},
			{
				path: '/feature-aminity',
				element: <FeatureAminity />,
			},
			{
				path: '/blog',
				element: <Blog />,
			},
			{
				path: '/privacy-policy',
				element: <Privacy />,
			},
			{
				path: '/blog/:id',
				element: <SingleblogDetails />,
			},
			{
				path: '/career',
				element: <Career />,
			},
			{
				path: '/contact-us',
				element: <Contact />,
			},
			{
				path: 'login',
				element: <Login />,
			},
			{
				path: '/user/forget-password',
				element: <ForgetPassword />,
			},
			{
				path: '/user/forgetPasswordRequest',
				element: <ForgetPasswordRequest />,
			},
			{
				path: '/sign-up',
				element: <SignUp />,
			},
			{
				path: '/book-visit',
				element: <BookVisit />,
			},
		],
	},
	{
		path: '/admin',
		element: (
			<PrivateRoute>
				<Dashboard />
			</PrivateRoute>
		),
		children: [
			{
				path: '/admin',
				element: <MainDashboard />,
			},
			{
				path: 'manage-bookVisit',
				element: <ManageBookVisit />,
			},
			{
				path: 'manage-property',
				element: <ManageProperty />,
			},
			{
				path: 'manage-Booking',
				element: <ManageBooking />,
			},
			{
				path: 'manage-blog',
				element: <ManageBlog />,
			},
			{
				path: 'manage-team',
				element: <ManageTeam />,
			},
			{
				path: 'achievement',
				element: <ManageAchievement />,
			},
			{
				path: 'manageContact',
				element: <ManageContact />,
			},
			{
				path: 'manageCareer',
				element: <ManageCareer />,
			},
			{
				path: 'manageusers',
				element: <ManageUsers />,
			},
		],
	},
	{
		path: 'admin/sign-in',
		element: <SingIn />,
	},
	{
		path: '*',
		element: <NotFound />,
	},
]);

export default router;
