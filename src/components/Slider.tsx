import { useRef, useState } from 'react';
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
	const [indexActive, setIndexActive] = useState(0)
	
	const indexMax = items.length*2 - 1
	const widthValue: number = parseInt(width.replace(/[^0-9]/g, ''))
	const widthUnit: string = width.replace(/\d/g, '')

	const renderSlides = () => 
		items.map((item, i) => 
			<li key={i} style={{width: width}}>{item}</li>
		)
	const handleNav = (buttonName: string) => {
		switch (buttonName) {
			case 'prev':
				if (indexActive==0) {
					setIndexActive(indexMax)
					// 뒤에 있던(?) 복제본을 떼어서 앞에 붙인다
				}
				else {
					setIndexActive(indexActive-1)
				}
				// translateX -width 이동
				// ul의 left값에 슬라이드너비*3을 뺀다
				break;
				
				case 'next':
				// translateX +width 이동
				
				break;
		}
	}
	const handlePagination = (clickedIndex: number) => {
		setIndexActive(clickedIndex)
	}
	
	return (
		<div className="slider-container">
			<div className="viewport" style={{width: width}}>
				<ul ref={sliderWrapRef} style={{width: widthValue*items.length*2 + widthUnit}}>
					{ renderSlides() }
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
						Array.from({length: items.length}, (_, i)=>
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