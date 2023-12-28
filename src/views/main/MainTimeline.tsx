import { forwardRef, useEffect, useRef, useState } from 'react'
import { useWindowDimensions } from '../../utils/customHooks';

export default forwardRef(function MainTimeline({startYear}: any, ref: any){
	console.log('[MainTimeline]', ref);
	const targetRefs = ref //timeline클릭시 이동할 element의 ref값들
	const timelineRef: any = useRef(null)
	const {height: windowH} = useWindowDimensions()
	const scrollInfos: Array<any> = []
	const clickInfos = new Map()
	
	targetRefs.current.forEach((ref: HTMLElement, i: number, refs: any) => {
		const startYear = Number(ref.dataset.period!.split('-')[0])
		const endYear = Number(ref.dataset.period!.split('-')[1])
		const scrollTop = 
			i === 0
			? Math.abs(ref.getBoundingClientRect().top)
			: Math.abs(ref.getBoundingClientRect().top) - windowH/2
		const scrollBottom = 
			i === refs.length-1
			? Math.abs(ref.getBoundingClientRect().bottom)
			: Math.abs(refs[i+1].getBoundingClientRect().top) - windowH/2

		scrollInfos.push({
			startYear, 
			endYear, 
			scrollTop, 
			scrollBottom, 
		})
		
		// timeline클릭시 item별로 실행할 함수 세팅
		Array.from({length: endYear-startYear+1}, (_, i)=>startYear+i).forEach((year, i) => {
			// 
			if (i===0 || !clickInfos.get(year)) {
				clickInfos.set(year, ref.scrollIntoView)
			}
		})
	})
	
	const renderTimelineItems = () => {
		const currentYear = new Date().getFullYear()
		
		return Array.from({length: currentYear-startYear+1}, (_, i)=>currentYear-i).map((year, i) =>
			<li key={year} data-year={year}
				{...i===0 && {className: 'on'}}
			>
				{year === currentYear ? 'NOW' : year}
			</li>
		)
	}

	// {현 scrollTop값}이 {특정section 위치 - viewport높이값 1/3}에 오면
	// ㄴ 그 section의 {period}에 해당하는 li에 class on
	const onScroll = () => {
		const scrollTop = window.scrollY;
		const targetTop = targetRefs.current[0].getBoundingClientRect().top - windowH/2
		const nextTargetTop = targetRefs.current[1].getBoundingClientRect().top - windowH/2
		const period = {
			start: targetRefs.current[0].dataset.period.split('-')[0], 
			end: targetRefs.current[0].dataset.period.split('-')[1], 
		}
		if (scrollTop >= targetTop && scrollTop < nextTargetTop) {
			Array.from(timelineRef.current!.children).forEach((item: any) => {
				const itemDataYear = Number(item.dataset.year)
				if (itemDataYear >= period.start && itemDataYear <= period.end) {
					item.classList.add('on')
				}else{
					item.classList.remove('on')
				}
			})
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, []);
	
	return (
		<ul className='timeline' ref={timelineRef}>
			{ renderTimelineItems() }
			{/* <li data-year="2023" className='off'>NOW</li>
			<li>2022</li>
			<li>2021</li>
			<li>2020</li>
			<li className='off'>2019</li> */}
		</ul>
	)
})