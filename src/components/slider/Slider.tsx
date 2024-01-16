import React, { ReactElement, RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ISliderProps as IProps, TDirection, TPaginationType, IMoveInfo, IPageBulletItemProps, IPageThumbnailItemProps } from './ISlider';
import PageBulletItem from './PageBulletItem';
import PageThumbnailItem from './PageThumbnailItem';
import '../../assets/styles/components/slider.scss';
import { getElementByType } from '../../utils/elementUtills';
import styled from 'styled-components';

export default function Slider({
	containerClass, 
	sliderId, 
	items, 
	slideWidth, 
	slideHeight, 
	showBullets = true, 
	bulletsClass = '', 
	showThumbnails = true, 
	thumbnailWidthDivision = 4, 
	thumbnailHeight, 
	thumbnailGap, 
	startIndex = 0, 
	infinite = true, 
	// speed = 1000, 
}: IProps){
	const itemLength = items.length
	const indexLast = itemLength-1 + 2 //앞뒤 하나씩 아이템 2개 추가됨
	const ratioDefault = 1.6; //임의 비율 8:5
	const slideWidthValue: number = parseInt(slideWidth.replace(/[^0-9]/g, ''))
	const slideWidthUnit: string = slideWidth.replace(/\d/g, '')
	if (!slideHeight) {
		slideHeight = Math.round(slideWidthValue / ratioDefault) + slideWidthUnit
	}
	let thumbnailGapValue
	if (!thumbnailGap) {
		thumbnailGapValue = Math.round((slideWidthValue / thumbnailWidthDivision) * 0.1)
		thumbnailGap = thumbnailGapValue + slideWidthUnit
	}else{
		thumbnailGapValue = parseInt(thumbnailGap.replace(/[^0-9]/g, ''))
	}
	const thumbnailWidth = `calc((100% / ${thumbnailWidthDivision}) - ${thumbnailGap})`
	if (!thumbnailHeight) { //thumbnailGap관련 예상변수가 많아서 임의로 지정
		thumbnailHeight = 
			(slideWidthValue / thumbnailWidthDivision - thumbnailGapValue) / 1.44 + slideWidthUnit
	}

	const sliderWrapRef: RefObject<HTMLUListElement> = useRef(null)
	const [slideRefs, setSlideRefs] = useState<{current: Array<HTMLElement|null>}>(
		{current: Array.from({length: itemLength}, ()=>null)}
	)
	const [indexActive, setIndexActive] = useState(startIndex+1)
	const [reMoveInfo, setReMoveInfo] = useState<IMoveInfo | null>(null)
	
	const indexActiveReal = //활성화된 슬라이드의 아이템상 실제 index
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


	const renderSlides = useCallback(() => {
		console.log('renderSlides');
		let slides: Array<ReactElement> = []
		let attrs: any = {}
		attrs.style = {
			width: slideWidth, 
		}
		if (showThumbnails) {
			const slideRefsBackup: RefObject<Array<HTMLElement|null>> = useRef([])
			// ref callback 함수. 썸네일 생성에 필요
			const onRefUpdate = (node: HTMLElement|null, indexUpdated: number, hasImg: boolean)=>{
				// console.log('onSlideRefUpdate', node , indexUpdated);

				if (!slideRefs.current[indexUpdated] && node) {
					// 해당ref에 이미지 없을시 ref값 setState
					// 이미지 있을시 ref값 별도저장 (로드완료후 가져와 setState하기위해)
					if (hasImg) {
						slideRefsBackup.current![indexUpdated] = node
					}else{
						setSlideRefs(prev => {
							let prevClone = {...prev}
							prevClone.current[indexUpdated] = node
							return prevClone
						})
					}
				}
			}
			const onSlideImgLoad = (indexUpdated: number) => {
				// console.log('onSlideImgLoad', slideRefsBackup);
				if (!slideRefs.current[indexUpdated]) {
					// 이미지 로드완료시 부모li의 ref값을 setState
					setSlideRefs(prev => {
						let prevClone = {...prev}
						prevClone.current[indexUpdated] = slideRefsBackup.current![indexUpdated]
						return prevClone
					})
				}
			}
			// item의 img요소에 onLoad적용할 함수
			// ㄴ 로드완료시 썸네일 생성하기 위해 필요
			const setImgOnLoad = (parentIdx: number) => (el: ReactElement) => {
				return {...el,
					props: {...el.props, 
						onLoad: () => onSlideImgLoad(parentIdx), 
					}
				}
			}

			slides = items.map((item, i) =>{
				// item 순회 함수. 이미지 없을시 null, 있을시 콜백함수적용한 item을 반환 
				const itemSettedOnLoad = getElementByType(item, 'img', setImgOnLoad(i))
				if (itemSettedOnLoad) {
					item = itemSettedOnLoad
				}
				attrs.ref = (node: HTMLElement|null)=> {
					onRefUpdate(node, i, itemSettedOnLoad ? true: false)
				}
				attrs.className = 'test'+i
	
				return <li key={i} {...attrs}>{item}</li>
			})
		}
		else{
			slides = items.map((item, i) => 
				<li key={i} {...attrs}>{item}</li>
			)
		}
		
		return (
			<>
			{/* 마지막 슬라이드를 앞에, 첫번째 슬라이드를 뒤에 붙이고 시작합니다 */}
			<li style={{width: slideWidth}}>{items[itemLength-1]}</li>
			{ slides }
			<li style={{width: slideWidth}}>{items[0]}</li>
			</>
		)
	}, [items])
	
	const renderPagination = (type: TPaginationType) => {
		// console.log('renderPagination', type, slideRefs);

		const getCommonProps = (indexPage: number) => {
			// 페이지네이션(bullet, thumbnail)에 넘길 공통 props
			const distance = indexPage - indexActiveReal
			const direction = distance < 0 ? -1 : 1
			const moveNum = Math.abs(distance)
			return {
				id: indexPage, 
				isActive: indexPage === indexActiveReal ? true : false, 
				onClick: ()=>handleNav(direction, moveNum)
			}
		}

		if (type === 'thumbnail') {
			return Array.from({length: itemLength}, (_, i)=> {
				let props: IPageThumbnailItemProps = {
					...getCommonProps(i), 
					...{ref: slideRefs.current![i]}, 
					quality: 1 / thumbnailWidthDivision
				}
				
				return <PageThumbnailItem key={i} {...props} />
			})
		}
		else{
			return Array.from({length: itemLength}, (_, i)=> {
				let props: IPageBulletItemProps = {
					...getCommonProps(i), 
				}
				
				return <PageBulletItem key={i} {...props} />
			})
		}
	}

	const handleNav = (direction: TDirection, moveNum: number) => {
		if (
			(indexActive == 0 && direction == -1)
			|| (indexActive == indexLast && direction == 1)
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
		<SliderContainer id={sliderId}
			className={`slider-container ${containerClass}`}
			width={slideWidth}
		>
			{/* {indexActive} */}
			<div className="relative">
				<div className="viewport" style={{height: slideHeight}}>
					<ul ref={sliderWrapRef}
						className='animate'
						style={{
							width: slideWidthValue*(itemLength+2) + slideWidthUnit, 
							transform: `translateX(-${slideWidthValue*indexActive + slideWidthUnit})`, 
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
				showBullets &&
				<ul className={`bullets ${bulletsClass}`}>
					{ renderPagination('bullet') }
				</ul>
			}
			{
				showThumbnails && 
				<Thumbnails className="thumbnails"
					width={thumbnailWidth}
					height={thumbnailHeight}
					gap={thumbnailGap}
				>
					{ renderPagination('thumbnail') }
				</Thumbnails>
			}
		</SliderContainer>
	)
}

const SliderContainer = styled.div<any>`
	width: ${({width}) => width}
`
const Thumbnails = styled.ul<any>`
	width: calc(100% + ${({gap}) => gap});
	margin-left: -${({gap}) => gap};
	li {
		width: ${({width}) => width};
		height: ${({height}) => height};
		margin-left: ${({gap}) => gap};
	}
`