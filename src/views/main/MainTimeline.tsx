import { forwardRef, useEffect, useRef, useState } from 'react'
import { useWindowDimensions } from '../../utils/customHooks';

interface IScrollInfo {
	index: number, 
	startYear: number, 
	endYear: number, 
	scrollTop: number, 
	scrollBottom: number, 
}

export default forwardRef(function MainTimeline({startYear}: any, ref: any){
	console.log('[MainTimeline]', ref);
	const targetRefs = ref //timeline클릭시 이동할 element들. 순서보장(연도 내림차순)
	const {height: windowH} = useWindowDimensions()
	const timelineRef: any = useRef(null)
	// let currScrollInfoIndex: any = null
	const [currScrollInfo, setCurrScrollInfo] = useState<IScrollInfo|null>(null)
	
	// 클릭,스크롤 이벤트에 필요한 정보를 targetRefs에서 가져오기
	const clickInfos = new Map()
	const scrollInfos: Array<IScrollInfo> = []
	targetRefs.current.forEach((ref: HTMLElement, i: number, refs: any) => {
		const scrollTop = 
			i === 0
			? Math.round(ref.getBoundingClientRect().top + window.scrollY)
			: Math.round(ref.getBoundingClientRect().top + window.scrollY) - windowH/2
		const scrollBottom = 
			i === refs.length-1
			? Math.round(ref.getBoundingClientRect().bottom + window.scrollY)
			: Math.round(refs[i+1].getBoundingClientRect().top + window.scrollY) - windowH/2

		const startYear = Number(ref.dataset.period!.split('-')[0])
		const endYear = Number(ref.dataset.period!.split('-')[1])
		
		const scrollInfo = {
			index: i, 
			scrollTop, 
			scrollBottom, 
			startYear, 
			endYear, 
		}

		// 스크롤이벤트에 필요한 정보 세팅
		scrollInfos.push(scrollInfo)
		
		// item별 클릭이벤트 세팅 (스크롤 이동 함수)
		// 현 ref의 period범위에 속하는 item은 모두 동일한 함수 적용
		Array.from({length: endYear-startYear+1}, (_, i)=>startYear+i).forEach((year, i) => {
			if (!clickInfos.get(year) || i===0) {
				clickInfos.set(year, ()=>{ref.scrollIntoView({behavior: 'smooth', block: 'center'})})
			}
		})

		// 현 스크롤위치에 해당하는 정보를 상태값으로 업데이트 (처음 한번만)
		if (
			!currScrollInfo
			&& (
				(window.scrollY >= scrollTop && window.scrollY < scrollBottom)
				|| (i===0 && window.scrollY < scrollTop)
				|| (i===refs.length-1 && window.scrollY > scrollBottom)
			)
		) {
			setCurrScrollInfo(scrollInfo)
		}
	})
	
	const renderTimelineItems = () => {
		// console.log('window.scrollY:', window.scrollY, scrollInfos);
		const currentYear = new Date().getFullYear()
		
		const getAttrs = (year: number) => {
			const attrs: any = {}
			// 현 스크롤위치에 따른 아이템 활성화
			if (
				currScrollInfo
				&& year >= currScrollInfo.startYear
				&& year <= currScrollInfo.endYear
			) {
				attrs.className = 'on'
			}

			// 클릭이벤트 등록
			if (clickInfos.get(year)) {
				attrs.onClick = clickInfos.get(year)
			}else{
				// clickInfos에 없는 연도는 비활성화
				attrs.className = 'off'
			}
			
			return attrs
		}
		
		return Array.from({length: currentYear-startYear+1}, (_, i)=> {
			const year = currentYear - i
			return (
				<li key={i}
					data-year={year}
					{...getAttrs(year)}
				>
					{i === 0 ? 'NOW' : year}
				</li>
			)
		}
		)
	}

	const onScroll = () => {
		if (
			currScrollInfo
			&& (
				(window.scrollY < currScrollInfo.scrollTop && currScrollInfo.index !== 0)
				|| (window.scrollY >= currScrollInfo.scrollBottom && currScrollInfo.index !== scrollInfos.length-1)
			)
		) {
			// 현 스크롤위치가 설정범위를 벗어날 시 범위 재설정 (스크롤정보 업데이트)
			const direction = window.scrollY - currScrollInfo.scrollTop < 0 ? -1 : 1
			setCurrScrollInfo(scrollInfos[currScrollInfo.index + direction])

			console.log(1, direction, window.scrollY, currScrollInfo.scrollTop, currScrollInfo.scrollBottom);
			
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, []);
	
	useEffect(()=>{
		// 현 스크롤위치 범위에 해당하는 아이템 활성화
		if (currScrollInfo) {
			console.log(2, currScrollInfo.startYear, currScrollInfo.endYear);
			Array.from(timelineRef.current!.children).forEach((item: any) => {
				const itemDataYear = Number(item.dataset.year)
				if (itemDataYear >= currScrollInfo.startYear && itemDataYear <= currScrollInfo.endYear) {
					item.classList.add('on')
				}else{
					item.classList.remove('on')
				}
			})
		}
	}, [currScrollInfo])
	
	return (
		<ul className='timeline' ref={timelineRef}>
			{ renderTimelineItems() }
		</ul>
	)
})