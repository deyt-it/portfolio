import { createBrowserRouter } from 'react-router-dom'

import MainView from './views/main/MainView.tsx'
import ErrorPage from './error-page.tsx'
import Topology from './Topology.tsx'
import Test from './views/Test.tsx'


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
	{
		path: '/test', 
		element: <Test />, 
	}, 
], 
{
	basename: '/portfolio', 
})

export default router