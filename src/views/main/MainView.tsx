import '../../assets/styles/main.scss';
import Slider from '../../components/slider/Slider';
import MainProjectDesc from './MainProjectDesc';
import imgTmp from '../../assets/images/img-tmp.jpg';
import imgTmpGif from '../../assets/images/img-tmp-gif.gif';


export default function MainView(){
	const sliderSetting = {
		items: [
			<img src={imgTmpGif} alt="" />, 
			<img src={imgTmp} alt="" />, 
			<div style={{width: '200px', backgroundColor: 'pink'}}>2</div>, 
			<div>3</div>, 
			<div>3</div>, 
			// <div><div><ul><li>depth</li><li><img src={imgTmp} alt="" /></li></ul></div></div>
		], 
		// containerClass: 'slider-area', 
		slideWidth: '545px', 
		slideHeight: '330px', 
	}
	const projectDesc = {
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
		corp: '서울이동통신', 
		link: 'https://say015.com', 
	}
	
	return (
		<div className="main-container">
			<article className='personal-info'>
				<h2>
					타이틀입니다.<br />
					두 줄이에요
				</h2>
				<div style={{height: '275px', backgroundColor: 'pink'}}>tmp</div>
			</article>

			<article className="career">
				<h2>Career</h2>
				<section>
					<Slider {...sliderSetting} containerClass="slider-area" />
					<MainProjectDesc {...projectDesc} containerClass="project-desc-area" />
				</section>
				<section>
					<Slider {...sliderSetting} containerClass="slider-area" />
					<MainProjectDesc {...projectDesc} containerClass="project-desc-area" />
				</section>

				<div className="timeline-rail">
				<div className="timeline-box">
					<ul className='timeline'>
						<li>NOW</li>
						<li className='on'>2022</li>
						<li className='on'>2021</li>
						<li>2020</li>
						<li className='off'>2019</li>
					</ul>
				</div>
				</div>
			</article>
		</div>
	)
}
