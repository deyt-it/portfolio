import { useEffect, useRef, useState } from 'react'

export default function MainTimeline(){
	const startYear = 2019;
	const endYear = new Date().getFullYear()

	// {현 scrollTop값}이 {특정section 위치 - viewport높이값 1/3}에 오면
	// ㄴ 그 section의 {period}에 해당하는 li에 class on
	const onScroll = () => {
		const scrollTop = window.scrollY;
		// console.log(scrollTop);
	};

	useEffect(() => {
		window.addEventListener('scroll', onScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, []);
	
	return (
		<ul className='timeline'>
			{
				Array.from({length: endYear-startYear+1}, (_, i)=>endYear-i).map(year =>
					<li data-year={year}>{year === endYear ? 'NOW' : year}</li>
				)
			}
			{/* <li data-year="2023" className='off'>NOW</li>
			<li>2022</li>
			<li>2021</li>
			<li>2020</li>
			<li className='off'>2019</li> */}
		</ul>
	)
}