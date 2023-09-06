import {
	useRouteError, 
	isRouteErrorResponse
} from 'react-router-dom'

const ErrorPage = () =>{
	const error = useRouteError()
	const errorMessage = 
		isRouteErrorResponse(error)
		? `${error.status} ${error.statusText}`
		: error instanceof Error
			? error.message
			: 'Unknown error'
	return (
		<>
			<h1>Oops! Sorry</h1>
			<p>{errorMessage}</p>
		</>
	)
}

export default ErrorPage