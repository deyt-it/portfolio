import loadingSpinner from '../assets/images/loading_spinner.gif'

export default function Loading (){
	
	return (
		<div className="loader">
			<img src={loadingSpinner} alt="" />
		</div>
	)
}