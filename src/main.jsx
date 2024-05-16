import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/routes.jsx';
import toast, { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import store from './store/index.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<React.StrictMode>
			<RouterProvider router={router} />
			<Toaster />
		</React.StrictMode>
	</Provider>
);
