import MainProjectDesc from './MainProjectDesc'


export default function MainView(){
	const item = {
		period: {
			start: 1614556800, 
			end: 1651276800, 
		}, 
		technologies: ['HTML5', 'Vue.js', 'etcc..'], 
		details: [
			{
				title: '포지션', 
				content: '웹 프론트엔드', 
			}, 
			{
				title: '프로젝트', 
				content: 'Say015 론칭 및 관리', 
			}, 
		], 
		link: 'https://say015.com', 
	}
	return (
		<MainProjectDesc {...item} />
	)
}
