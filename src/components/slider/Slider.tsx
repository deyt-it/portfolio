import React, { ReactElement, RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ISliderProps as IProps, TDirection, IMoveInfo, 	IPaginationItemProps, TPaginationType } from './ISlider';
import PaginationItem from './PaginationItem';
import '../../assets/styles/components/slider.scss';
import { getElementByType } from '../../utils/elementUtills';

export default function Slider({
	items, 
	width = '90vw', 
	pagination = true, 
	thumbnails = false, 
	infinite = true, 
	// speed = 1000, 
}: IProps){
	const itemLength = items.length
	const indexLast = itemLength-1 + 2 //앞뒤 하나씩 아이템 2개 추가됨
	const widthValue: number = parseInt(width.replace(/[^0-9]/g, ''))
	const widthUnit: string = width.replace(/\d/g, '')

	const sliderWrapRef: RefObject<HTMLUListElement> = useRef(null)
	const [slideRefs, setSlideRefs] = useState<{current: Array<HTMLElement|null>}>(
		{current: Array.from({length: itemLength}, ()=>null)}
	)
	const [indexActive, setIndexActive] = useState(1)
	const [reMoveInfo, setReMoveInfo] = useState<IMoveInfo | null>(null)
	
	const indexActiveReal = //실제 아이템의 index
		indexActive === 0
		? itemLength - 1
		: indexActive === indexLast
		? 0
		: indexActive - 1


	
	useEffect(()=>{
		if (reMoveInfo) {
			setIndexActive(indexActive + reMoveInfo.moveNum*reMoveInfo.direction)
			setReMoveInfo(null)
		}
	}, [reMoveInfo])


	const renderSlides = () => {
		console.log('renderSlides');
		let slides: Array<ReactElement> = []
		if (thumbnails) {
			const slideRefsBackup: RefObject<Array<HTMLElement|null>> = useRef([])
			// ref callback 함수. 썸네일 생성에 필요
			const onRefUpdate = (node: HTMLElement|null, i: number, hasImg: boolean)=>{
				console.log('onSlideRefUpdate', node , i);

				if (!slideRefs.current[i] && node) {
					// 해당ref에 이미지 없을시 ref값 setState
					// 이미지 있을시 로드완료후 ref값 setState하기위해 별도저장
					if (hasImg) {
						slideRefsBackup.current![i] = node
					}else{
						setSlideRefs(prev => {
							let prevClone = {...prev}
							prevClone.current[i] = node
							return prevClone
						})
					}
				}
			}
			const onSlideImgLoad = (i: number) => {
				console.log('onSlideImgLoad', slideRefsBackup);
				if (!slideRefs.current[i]) {
					// 이미지 로드완료시 부모li의 ref값을 setState
					setSlideRefs(prev => {
						let prevClone = {...prev}
						prevClone.current[i] = slideRefsBackup.current![i]
						return prevClone
					})
				}
			}
			// item의 img요소에 onLoad적용할 함수
			// ㄴ 로드완료시 썸네일 생성하기 위해 필요
			const setImgOnLoad = (i: number) => (el: ReactElement) => {
				return {...el,
					props: {...el.props, 
						onLoad: () => onSlideImgLoad(i), 
					}
				}
			}

			slides = items.map((item, i) =>{
				// item 순회 함수. 이미지 없을시 null, 있을시 콜백함수적용한 item을 반환 
				const itemSettedOnLoad = getElementByType(item, 'img', setImgOnLoad(i))
				if (itemSettedOnLoad) {
					item = itemSettedOnLoad
				}
				let attrs: any = {}
				attrs.style = {width: width}
				attrs.ref = (node: HTMLElement|null)=> {
					onRefUpdate(node, i, itemSettedOnLoad ? true: false)
				}
	
				return <li key={i} {...attrs}>{item}</li>
			})
		}
		else{
			slides = items.map((item, i) => 
				<li key={i} style={{width: width}}>{item}</li>
			)
		}
		
		return (
			<>
			{/* 마지막 슬라이드를 앞에, 첫번째 슬라이드를 뒤에 붙이고 시작합니다 */}
			<li style={{width: width}}>{items[itemLength-1]}</li>
			{ slides }
			<li style={{width: width}}>{items[0]}</li>
			</>
		)
	}
	
	const renderPagination = (type: TPaginationType) => {
		console.log('renderPagination', type, slideRefs);
		
		return Array.from({length: itemLength}, (_, i)=> {
			let props: IPaginationItemProps = {
				id: i, 
				type: type, 
				...thumbnails && {ref: slideRefs.current![i]}, 
			}
			if (i === indexActiveReal) {
				props.className = 'on'
			}else{
				const direction = i - indexActiveReal < 0 ? -1 : 1
				const moveNum = Math.abs(i - indexActiveReal)
				props.onClick = ()=>handleNav(direction, moveNum)
			}
			
			return <PaginationItem key={i} {...props} />
		})
	}

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