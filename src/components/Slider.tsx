import React, { ReactElement, RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { toJpeg } from 'html-to-image';
import '../assets/styles/components/slider.scss';
import PaginationItem from './PaginationItem';
import { ISliderProps as IProps, TDirection, IMoveInfo, 	IPaginationItemProps, TPaginationType } from './ISlider';

export default function Slider({
	items, 
	width = '90vw', 
	pagination = true, 
	thumbnails = false, 
	infinite = true, 
	// speed = 1000, 
}: IProps){
	const itemLength = items.length
	const indexLast = itemLength-1 + 2 //앞뒤 하나씩 슬라이드 2개 추가됨
	const widthValue: number = parseInt(width.replace(/[^0-9]/g, ''))
	const widthUnit: string = width.replace(/\d/g, '')

	const sliderWrapRef: RefObject<HTMLUListElement> = useRef(null)
	let slideRefs: Array<HTMLLIElement> = []
	useEffect(()=> {
		slideRefs = slideRefs.slice(0, itemLength)
	}, [items])
	// const [test, setTest] = useState(false)
	const [thumbnailUrls, setThumbnailUrls] = useState(Array.from({length: itemLength}, ()=> ""))
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
	const [reMoveInfo, setReMoveInfo] = useState<IMoveInfo | null>(null)

	const renderSlides = () => {
		console.log('renderSlides');
		// 마지막 슬라이드를 앞에, 첫번째 슬라이드를 뒤에 붙이고 시작합니다
		const itemsClone = [items[itemLength-1], ...items, items[0]]

		// itemsClone[1] = {
		// 	...itemsClone[1], 
		// 	props: {
		// 		...itemsClone[1].props, 
		// 		onLoad: ()=>setTest(true), 
		// 		// onClick: ()=>{console.log('??????????????????')}
		// 	}
		// }
		
		return (
			itemsClone.map((item, i) => {
				const attrs: any = {}
				if (thumbnails && (i!=0 && i!=indexLast)) {
					// 복제아이템 제외하고 썸네일 생성용 ref값 추가
					// ing.. 아이템 순회해서 img있으면 ref값 붙이고 나오자

					// const slideRef = useRef<HTMLLIElement>(null)
					// slideRefs.push(slideRef)
					attrs.ref = (node: HTMLLIElement) => slideRefs[i] = node
					// attrs.className = 'ref'
				}

				return <li key={i} style={{width: width}} {...attrs}>{item}</li>
			})
		)
	}
	
		const renderPagination = (type: TPaginationType) => {
			return Array.from({length: itemLength}, (_, i)=> {
				let props: IPaginationItemProps = {
					id: i, 
					type: type, 
					itemRef: slideRefs[i], 
				}
				if (i == indexActiveReal) {
					props.className = 'on'
				}else{
					const direction = i - indexActiveReal < 0 ? -1 : 1
					const moveNum = Math.abs(i - indexActiveReal)
					props.onClick = ()=>handleNav(direction, moveNum)
				}
				
				return <PaginationItem key={i} {...props} />
			})
		}

	// createThumnails
	// useEffect(()=>{
	// 	console.log('useEffect');
	// 	// console.log('test', test);

	// 	if (thumbnails && slideRefs[itemLength-1].current) {
	// 		// 슬라이드 ref값 모두 있을시 썸네일 렌더링
	// 		console.log(1, slideRefs);
			
	// 		slideRefs.map((slideRef, i) => {
	// 			toJpeg(slideRef.current!, {cacheBust: true})
	// 			.then(url => {
	// 				setThumbnailUrls((prev)=>{
	// 					const prevClone = [...prev]
	// 					prevClone[i] = url
	// 					return prevClone
	// 				})
	// 			})
	// 			.catch(e => {
	// 				console.log(e);
	// 			})
	// 		})
	// 	}
		
	// }, [])

	const handleNav = (direction: TDirection, moveNum: number) => {
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

	const rePosition = (direction: TDirection) => {
		// 방향에 따라 첫칸/끝칸 이동 여부가 정해지므로 direction 필요
		sliderWrapRef.current!.classList.remove('animate')
		setIndexActive(indexActive + itemLength*-direction)
	}
	const reMove = (direction: TDirection, moveNum: number) => {
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

	// const test = {test: 1}
	// useEffect(()=>{console.log('값변함');
	// }, [test])
	
	return (
		<div className="slider-container" style={{width: width}}>
			{/* {indexActive} */}
			<div className="relative">
				<div className="viewport">
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
			</div>
			{
				pagination &&
				<ul className="pagination">
					{ renderPagination('page') }
				</ul>
			}
			{
				thumbnails && 
				<ul className="thumbnails">
					{ renderPagination('thumbnail') }
				</ul>
			}
		</div>
	)
}