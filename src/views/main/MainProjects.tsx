import { ISliderProps } from '../../components/slider/ISlider';
import { IMainProjectDesc } from './MainProjectDesc';
import career01sjw1 from '../../assets/images/01sjw-1.gif';
import career01sjw2 from '../../assets/images/01sjw-2.gif';
import career01sjw3 from '../../assets/images/01sjw-3.gif';
import career01sjw4 from '../../assets/images/01sjw-4.gif';
import career01sjw5 from '../../assets/images/01sjw-5.gif';
import career01sjw6 from '../../assets/images/01sjw-6.gif';
import career01sjw7 from '../../assets/images/01sjw-7.gif';
import career02onuii1 from '../../assets/images/02onuii-1.gif';
import career02onuii2 from '../../assets/images/02onuii-2.gif';
import career03seoultel1 from '../../assets/images/03seoultel-1.jpg';
import career03seoultel2 from '../../assets/images/03seoultel-2.gif';
import career03seoultel3 from '../../assets/images/03seoultel-3.gif';
import career03seoultel4 from '../../assets/images/03seoultel-4.jpg';
import career03seoultel5 from '../../assets/images/03seoultel-5.jpg';
import career04teemstone1 from '../../assets/images/04teemstone-1.gif';
import career04teemstone2 from '../../assets/images/04teemstone-2.gif';

interface IMainProject {
	sliderProps: ISliderProps, 
	projectDescProps: IMainProjectDesc, 
}
const slideWidth = '545px';
const slideHeight = '330px';

export const projects: Array<IMainProject> = [
	{
		sliderProps: {
			items: [
				<img src={career04teemstone1} alt="" />, 
				<img src={career04teemstone2} alt="" />, 
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
					content: '웹 프론트엔드 개발자', 
				}, 
				{
					title: '프로젝트', 
					content: '삼성생명 토폴로지 PoC', 
				}, 
				{
					title: '담당기능', 
					content: '사내 네트워크(서버-시스템-서비스) 노드별 조회 및 전체조회 기능', 
				}, 
			], 
			corp: '팀스톤', 
		}
	}, 

	{
		sliderProps: {
			items: [
				<img src={career03seoultel1} alt="" />, 
				<img src={career03seoultel2} alt="" />, 
				<img src={career03seoultel3} alt="" />, 
				<img src={career03seoultel4} alt="" />, 
				<img src={career03seoultel5} alt="" />, 
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
					content: '웹 프론트엔드 개발자', 
				}, 
				{
					title: '프로젝트', 
					content: 'Say015 론칭 및 관리', 
				}, 
				{
					title: '담당기능', 
					content: 'ARS설정 v1 / ARS설정 v2 / 회원가입 / 채팅 / 관리자', 
				}, 
			], 
			corp: '서울이동통신', 
			links: [
				'* https://say015.com', 
			], 
		}
	}, 
	
	{
		sliderProps: {
			items: [
				<img src={career02onuii1} alt="" />, 
				<img src={career02onuii2} alt="" />, 
			], 
			slideWidth: slideWidth, 
			slideHeight: slideHeight, 
		}, 
		projectDescProps: {
			period: {
				start: new Date('2020-09-01'), 
				end: new Date('2021-02-01'), 
			}, 
			technologies: ['HTML5', 'Sass(SCSS)', 'ReactJS', 'ES6', 'Axios', 'Responsive Web'], 
			details: [
				{
					title: '포지션', 
					content: '웹 프론트엔드 개발자', 
				}, 
				{
					title: '프로젝트', 
					content: '수강후기 페이지 신설 및 반응형 도입 / 수강신청 유지보수', 
				}, 
				{
					title: '담당기능', 
					content: '다중 필터링 게시판 (페이징 직접 구현) / Youtube API사용 탭메뉴', 
				}, 
			], 
			corp: '오누이', 
			links: [
				'https://www.seoltab.com/seoltab_review', 
			], 
		}
	}, 

	{
		sliderProps: {
			items: [
				<img src={career01sjw1} alt="" />, 
				<img src={career01sjw2} alt="" />, 
				<img src={career01sjw3} alt="" />, 
				<img src={career01sjw4} alt="" />, 
				<img src={career01sjw5} alt="" />, 
				<img src={career01sjw6} alt="" />, 
				<img src={career01sjw7} alt="" />, 
			], 
			slideWidth: slideWidth, 
			slideHeight: slideHeight, 
		}, 
		projectDescProps: {
			period: {
				start: new Date('2013-03-01'), 
				end: new Date('2018-11-01'), 
			}, 
			technologies: ['HTML5', 'CSS3', 'jQuery', 'VanillaJS', 'Cross Browsing', 'Accessibility'], 
			details: [
				{
					title: '포지션', 
					content: '웹 퍼블리셔', 
				}, 
				{
					title: '프로젝트', 
					content: '시원스쿨 일본어, 위런영어, b2b 사이트 오픈 / 시원스쿨 웹사이트 다수 리뉴얼 및 유지보수', 
				}, 
				{
					title: '담당기능', 
					content: '사이트 공통 기능(모달팝업, 탭메뉴, 슬라이더, 상하단 고정 배너 등) / fullPage, slimscroll, audio DOM 사용 애니메이션', 
				}, 
			], 
			corp: '에스제이더블유인터내셔널', 
			links: [
				'https://lab.siwonschool.com/', 
				'* https://welearn.siwonschool.com/', 
				'https://www.siwonschool.com/?s=event&t=160318', 
			]
		}
	}, 

]