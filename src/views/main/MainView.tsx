import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { projects } from './MainProjects';
import Slider from '../../components/slider/Slider';
import MainProjectDesc from './MainProjectDesc';
import MainTimeline from './MainTimeline';
import '../../assets/styles/main.scss';


export default function MainView(){
	const projectRefs: RefObject<Array<HTMLElement|null>> = useRef([])
	const onProjectRefUpdate = useCallback((node: HTMLElement|null, indexUpdated: number) => {
		projectRefs.current![indexUpdated] = node
	}, [])
	const [isAllProjectRefsUpdated, setIsAllProjectRefsUpdated] = useState(false)

	const timelineProps = {
		startYear: 2013
	}

	useEffect(()=>{
		// projectRefs 모두 업데이트된 후 timeline 렌더링 실행
		if (projectRefs.current!.length < projects.length) return;
		setIsAllProjectRefsUpdated(true)
		// projectRefs.current![0]?.scrollIntoView()
	}, [onProjectRefUpdate])

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
					projects.map((item, i) => {
						const period = item.projectDescProps.period
						const dataPeriod = period.start.getFullYear()+'-'+period.end.getFullYear()
						
						return (
							<section key={i}
								data-period={dataPeriod}
								ref={node => onProjectRefUpdate(node, i)}
							>
								<Slider {...item.sliderProps} containerClass="slider-area" />
								<MainProjectDesc {...item.projectDescProps} containerClass='project-desc-area' />
							</section>
						)
					})
				}
				</div>

				<div className="timeline-rail">
				<div className="timeline-box">
					{
						isAllProjectRefsUpdated &&
							<MainTimeline {...timelineProps} ref={projectRefs} />
					}
				</div>
				</div>
			</article>
		</div>
	)
}
