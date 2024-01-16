import { useCallback, useEffect, useRef, useState } from 'react';
import { projects } from './MainProjects';
import Slider from '../../components/slider/Slider';
import MainProjectDesc from './MainProjectDesc';
import MainTimeline from './MainTimeline';
import '../../assets/styles/main.scss';


export default function MainView(){
	const projectRefs = useRef<Array<HTMLElement|null>>([])
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
			<article className='personal-info'>
				<h2>
					공부를 놓지 않는 개발자<br />
					김지연 입니다.
				</h2>
				<ul>
					<li>
						<p className="title">GitHub</p>
						<p className="content">
							<a href="https://github.com/deyt-it/portfolio" target="_blank">
								https://github.com/deyt-it/portfolio
							</a>
						</p>
					</li>
					<li>
						<p className="title">E-mail</p>
						<p className="content">
							deyt.it02@gmail.com
						</p>
					</li>
					<li>
						<p className="title">Contact</p>
						<p className="content">
							010-5521-6740
						</p>
					</li>
				</ul>
			</article>

			<article className="career">
				<h2>Career</h2>
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
				<div className="timeline-box" style={{maxHeight: projectRefs.current[0]?.offsetHeight}}>
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
