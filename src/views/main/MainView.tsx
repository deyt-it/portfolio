import { useRef } from 'react';
import { careerItems } from './MainCareerItems';
import Slider from '../../components/slider/Slider';
import MainProjectDesc from './MainProjectDesc';
import MainTimeline from './MainTimeline';
import '../../assets/styles/main.scss';


export default function MainView(){
	const projectRefs = useRef([])

	// ing..
	// refs 모두 업뎃되면, props 뽑아서 timeline에 전달
	// ㄴ 모두 업뎃된 시점에 timeline 렌더링 실행

	return (
		<div className="main-container">
			<h2>
				타이틀입니다.<br />
				두 줄이에요
			</h2>
			<article className='personal-info'>
				<div style={{height: '275px', backgroundColor: 'pink'}}>tmp</div>
			</article>

			<h2>Career</h2>
			<article className="career">
				<div className="projects">
				{
					careerItems.map((item, i) => {
						const period = item.projectDescProps.period
						const dataPeriod = period.start.getFullYear()+'-'+period.end.getFullYear()
						
						return (
							<section key={i} data-period={dataPeriod} ref={projectRefs.current[i]}>
								<Slider {...item.sliderProps} containerClass="slider-area" />
								<MainProjectDesc {...item.projectDescProps} containerClass='project-desc-area' />
							</section>
						)
					})
				}
				</div>

				<div className="timeline-rail">
				<div className="timeline-box">
					{/* prop - 
						[
							{
								period: {start: 2021, end: 2022}, 
								offsetTop: 534, 
							}, ...
						]
					 */}
					<MainTimeline />
				</div>
				</div>
			</article>
		</div>
	)
}
