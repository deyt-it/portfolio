import { ISliderProps } from '../../components/slider/ISlider';
import { IMainProjectDesc } from './MainProjectDesc';
import imgTmp from '../../assets/images/img-tmp.jpg';
import imgTmpGif from '../../assets/images/img-tmp-gif.gif';

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
			// link: 'https://say015.com', 
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
			link: 'https://say015.com', 
		}
	}, 
	
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
			link: 'https://www.seoltab.com/seoltab_review', 
		}
	}, 

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
			link: 'https://lab.siwonschool.com/', 
			// link: 'https://www.siwonschool.com/?s=event&t=160318', 
		}
	}, 

]