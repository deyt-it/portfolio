import { useState, useEffect, useCallback } from 'react'
import imgTmp from '../assets/images/img-tmp.jpg'

const ParentComp = () => {
	console.log('[ParentComp]');
	const items = [1,2,3,4,5,6,7,8,9,0]
	
	const [refDoms, setRefDom] = useState<{current: Array<HTMLElement|null>}>(
		{current: Array.from({length: items.length}, ()=>null)}
	)
	
	const onRefUpdate = useCallback((node: HTMLElement|null, i: number) => {
		console.log('onRefUpdate', refDoms, node);
		
		if (!refDoms.current[i] && node) {
			setRefDom(prev => {
				let prevClone = {...prev}
				prevClone.current[i] = node
				return prevClone
			})
		}
	}, [refDoms])
	const onImgLoad = (i: number) =>{
		console.log('onImgLoad', i);
		
	}
	
	useEffect(()=>{
		console.log('ref is updated', refDoms);
		
	}, [onRefUpdate])

	return (
		<>
		{/* <div ref={node => {onRefUpdate(node, 0)}}>test</div> */}
		{
			// 리렌더링시마다 ref값이 넘어온다
			items.map((num, i) => 
				<span key={i} ref={node => {onRefUpdate(node, i)}}>
					<img src={imgTmp} alt="" onLoad={()=>{onImgLoad(i)}} />
				</span>
			)
		}
		</>
	)
}

export default ParentComp