import { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { toJpeg } from 'html-to-image';
import '../assets/styles/components/slider.scss';

interface Props {
	items: Array<React.ReactNode>, 
	width?: string, 
	pagination?: boolean, 
	thumbnails?: boolean, 
	infinite?: boolean, 
	// speed?: number, 
}
type Direction = -1 | 1
interface MoveInfo {
	direction: Direction, 
	moveNum: number, 
}

export default function Slider({
	items, 
	width = '90vw', 
	pagination = true, 
	thumbnails = false, 
	infinite = true, 
	// speed = 1000, 
}: Props){
	const itemLength = items.length
	const indexLast = itemLength-1 + 2 //앞뒤 하나씩 슬라이드 2개 추가됨
	const widthValue: number = parseInt(width.replace(/[^0-9]/g, ''))
	const widthUnit: string = width.replace(/\d/g, '')

	const sliderWrapRef = useRef<HTMLUListElement>(null)
	let slideRefs: Array<RefObject<HTMLLIElement>> = []
	const [indexActive, setIndexActive] = useState(1)
	const indexActiveReal = useMemo(
		() => {//실제 item의 index
			let result = indexActive - 1
			if (indexActive == 0) { result = itemLength - 1 }
			if (indexActive == indexLast) { result = 0 }
			return result
		},
		[indexActive]
	)
	const [reMoveInfo, setReMoveInfo] = useState<MoveInfo | null>(null)

	const renderSlides = () => {
		// 마지막 슬라이드를 앞에, 첫번째 슬라이드를 뒤에 붙이고 시작합니다
		const itemsClone = [items[itemLength-1], ...items, items[0]]
		return (
			itemsClone.map((item, i) => {
				slideRefs.push(useRef<HTMLLIElement>(null))
				return <li key={i} style={{width: width}} ref={slideRefs[i]}>{item}</li>
			})
		)
	}
	const renderThumbnails = () => {
		// ing..
		// ref.current! useCallback?
		// let url
		// useEffect(async ()=>{
		// 	url = await toJpeg(slideRefs[0].current!, {cacheBust: true})
		// 	.then(r => r)
		// 	.catch(e => {
		// 		console.log(e);
		// 	})
		// }, [])
		return <li></li>
	}

	const handleNav = (direction: Direction, moveNum: number) => {
		if (
			(direction == -1 && indexActive == 0)
			|| (direction == 1 && indexActive == indexLast)
		) {
			// 슬라이드 양 끝에 다다랐을 시, 재조정 후 이동
			// ㄴ 두 동작을 연속으로 보여주기 위해 setTimeout이 필요
			rePosition(direction)
			setTimeout(() => {
				reMove(direction, moveNum)
			}, 0);
		}
		else {
			setIndexActive(indexActive + moveNum*direction)
		}
	}

	const rePosition = (direction: Direction) => {
		// 방향에 따라 첫칸/끝칸 이동 여부가 정해지므로 direction 필요
		sliderWrapRef.current!.classList.remove('animate')
		setIndexActive(indexActive + itemLength*-direction)
	}
	const reMove = (direction: Direction, moveNum: number) => {
		// useEffect를 통해 이동 애니메이션 재개
		sliderWrapRef.current!.classList.add('animate')
		setReMoveInfo({
			direction: direction, 
			moveNum: moveNum
		})
	}

	useEffect(()=>{
		if (reMoveInfo) {
			setIndexActive(indexActive + reMoveInfo.moveNum*reMoveInfo.direction)
			setReMoveInfo(null)
		}
	}, [reMoveInfo])
	
	return (
		<div className="slider-container">
			{/* {indexActive} */}
			<div className="viewport" style={{width: width}}>
				<ul ref={sliderWrapRef}
					className='animate'
					style={{
						width: widthValue*(itemLength+2) + widthUnit, 
						transform: `translateX(-${widthValue*indexActive + widthUnit})`, 
					}}
				>
					{ renderSlides() }
				</ul>
			</div>
			<div className="nav-buttons">
				<button onClick={()=>handleNav(-1, 1)} className='prev'>prev</button>
				<button onClick={()=>handleNav(1, 1)} className='next'>next</button>
			</div>
			{
				pagination &&
				<ul className="pagination">
					{
						Array.from({length: itemLength}, (_, i)=> {
							let attrs: any = {}
							if (i == indexActiveReal) {
								attrs.className = 'on'
							}else{
								const direction = i - indexActiveReal < 0 ? -1 : 1
								const moveNum = Math.abs(i - indexActiveReal)
								attrs.onClick = ()=>handleNav(direction, moveNum)
							}
							return <li key={i} {...attrs}>{i+1}</li>
						})
					}
				</ul>
			}
			{
				thumbnails && 
				<ul className="thumbnails">
					{
						renderThumbnails()
					}
					<li>
						ing..
						썸네일 구현 먼저. 라이브러리 찾아보자
						페이지네이션과의 함수통합은 그다음에 생각하기
					</li>
				</ul>
			}
		</div>
	)
}