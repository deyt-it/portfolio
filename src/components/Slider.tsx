import { useEffect, useRef, useState } from 'react';
import '../assets/styles/components/slider.scss';

interface Props {
	items: Array<React.ReactNode>, 
	width?: string, 
	pagination?: boolean, 
	thumbnails?: boolean, 
	infinite?: boolean, 
	// speed?: number, 
}

export default function Slider({
	items, 
	width = '90vw', 
	pagination = true, 
	thumbnails = false, 
	infinite = true, 
	// speed = 1000, 
}: Props){
	const sliderWrapRef = useRef<HTMLUListElement>(null)
	const [indexActive, setIndexActive] = useState(1)
	const [isRepositioned, setIsRepositioned] = useState(false)
	
	const slideLength = items.length
	const indexLast = slideLength-1 + 2 //앞뒤 하나씩 slide 2개 추가됨
	const widthValue: number = parseInt(width.replace(/[^0-9]/g, ''))
	const widthUnit: string = width.replace(/\d/g, '')

	// 마지막 슬라이드를 앞에, 첫번째 슬라이드를 뒤에 붙이고 시작합니다
	const renderSlides = () => {
		const slides = items.map((item, i) => 
			<li key={i} style={{width: width}}>{item}</li>
		)
		return [slides[slideLength-1], ...slides, slides[0]]
	}

	const handleNav = (buttonName: string) => {
		switch (buttonName) {
			case 'prev':
				if (indexActive==0) {
					// 슬라이드 위치 재조정
					// debugger
					sliderWrapRef.current!.classList.remove('animate')
					setIndexActive(indexActive + slideLength)
					setTimeout(() => {
						setIsRepositioned(true)
					}, 0);
				}else{
					setIndexActive(indexActive-1)
				}
				break;
				
				case 'next':
					if (indexActive==indexLast) {
						// 슬라이드 위치 재조정
						sliderWrapRef.current!.classList.remove('animate')
						setIndexActive(indexActive - slideLength)
						setTimeout(() => {
							setIsRepositioned(true)
						}, 0);
					}else{
						setIndexActive(indexActive+1)
					}
				
				break;
		}
	}
	useEffect(()=>{
		// 위치 재조정후, 슬라이드 이동 재개
		// indexActive값으로 좌/우 버튼 구분
		if (isRepositioned) {
			sliderWrapRef.current!.classList.add('animate')
			if (indexActive < slideLength) {
				setIndexActive(indexActive + 1)
			}else{
				setIndexActive(indexActive - 1)
			}
			setIsRepositioned(false)
		}
	}, [isRepositioned])

	const handlePagination = (clickedIndex: number) => {
		setIndexActive(clickedIndex)
	}
	
	return (
		<div className="slider-container">
			{widthValue*indexActive}
			<div className="viewport" style={{width: width}}>
				<ul ref={sliderWrapRef}
					className='animate'
					style={{
						width: widthValue*slideLength*2 + widthUnit, 
						transform: `translateX(-${widthValue*indexActive + widthUnit})`, 
					}}
				>
					{ renderSlides() }
				</ul>
			</div>
			<div className="nav-buttons">
				<button onClick={(e: any)=>handleNav(e.target.dataset.name)} className='prev' data-name='prev'>prev</button>
				<button onClick={(e: any)=>handleNav(e.target.dataset.name)} className='next' data-name='next'>next</button>
			</div>
			{
				pagination &&
				<ul className="pagination">
					{
						Array.from({length: slideLength}, (_, i)=>
							<li key={i} onClick={()=>handlePagination(i)}>{i+1}</li>
						)
					}
				</ul>
			}
			{
				thumbnails && 
				<ul className="thumbnails"></ul>
			}
		</div>
	)
}