import { createBrowserRouter } from 'react-router-dom'

import ErrorPage from './error-page.tsx'
import Topology from './Topology.tsx'
import MainView from './views/main/MainView.tsx'


const router = createBrowserRouter([
	{
		path: '/', 
		element: <MainView />, 
		errorElement: <ErrorPage />
	}, 
	{
		path: '/topology', 
		element: <Topology />, 
	}, 
])

export default router