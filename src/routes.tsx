import { createBrowserRouter } from 'react-router-dom'

import App from './App.tsx'
import ErrorPage from './error-page.tsx'
import './index.css'
import Topology from './Topology.tsx'


const router = createBrowserRouter([
	{
		path: '/', 
		element: <App />, 
		errorElement: <ErrorPage />
	}, 
	{
		path: '/topology', 
		element: <Topology />, 
	}, 
])

export default router