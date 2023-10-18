import MainProjectDesc from './MainProjectDesc'


export default function MainView(){
	const item = {
		period: {
			start: new Date('2021-03-01'), 
			end: new Date('2022-04-01'), 
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
			{
				title: '담당기능', 
				content: 'ARS설정, 회원가입, 채팅', 
			}, 
		], 
		link: 'https://say015.com', 
	}
	return (
		<div className="main-container">
			<MainProjectDesc {...item} />
		</div>
	)
}