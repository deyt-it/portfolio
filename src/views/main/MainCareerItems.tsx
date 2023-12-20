import { ISliderProps } from '../../components/slider/ISlider';
import { IMainProjectDesc } from './MainProjectDesc';
import imgTmp from '../../assets/images/img-tmp.jpg';
import imgTmpGif from '../../assets/images/img-tmp-gif.gif';

interface ICareerItem {
	sliderProps: ISliderProps, 
	projectDescProps: IMainProjectDesc, 
}
const slideWidth = '545px';
const slideHeight = '330px';

export const careerItems: Array<ICareerItem> = [
	{
		sliderProps: {
			items: [
				<img src={imgTmpGif} alt="" />, 
				<img src={imgTmp} alt="" />, 
				<div>3</div>, 
			], 
			slideWidth: slideWidth, 
			slideHeight: slideHeight, 
		}, 
		projectDescProps: {
			period: {
				start: new Date('2022-04-01'), 
				end: new Date('2022-09-01'), 
			}, 
			technologies: ['HTML5', 'Sass(SCSS)', 'ReactJS', 'd3'], 
			details: [
				{
					title: '포지션', 
					content: '웹 프론트엔드', 
				}, 
				{
					title: '프로젝트', 
					content: '삼성생명 토폴로지 PoC', 
				}, 
				{
					title: '담당기능', 
					content: 'ARS설정, 회원가입, 채팅', 
				}, 
			], 
			corp: '팀스톤', 
			link: 'https://say015.com', 
		}
	}, 
	{
		sliderProps: {
			items: [
				<img src={imgTmpGif} alt="" />, 
				<img src={imgTmp} alt="" />, 
				<div style={{width: '200px', backgroundColor: 'pink'}}>2</div>, 
				<div>3</div>, 
				<div>3</div>, 
				// <div><div><ul><li>depth</li><li><img src={imgTmp} alt="" /></li></ul></div></div>
			], 
			slideWidth: slideWidth, 
			slideHeight: slideHeight, 
		}, 
		projectDescProps: {
			period: {
				start: new Date('2021-03-01'), 
				end: new Date('2022-04-01'), 
			}, 
			technologies: ['HTML5', 'Sass(SCSS)', 'Vue.js', 'Vuetify.js', 'Axios'], 
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
					content: 'ARS설정 v1, ARS설정 v2, 회원가입, 채팅, 관리자', 
				}, 
			], 
			corp: '서울이동통신', 
			link: 'https://say015.com', 
		}
	}, 
]