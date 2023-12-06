import { useState, useEffect, useCallback } from 'react'

const ParentComp = () => {
	console.log('[ParentComp]');
	
	const [refDoms, setRefDom] = useState<{current: Array<HTMLElement|null>}>({current: []})
	const onRefUpdate = (node: HTMLElement|null, i: number) => {
		if (!refDoms.current[i]) {
			setRefDom(prev => {
				let prevClone = {...prev}
				prevClone.current[i] = node
				return prevClone
			})
		}
	}
	
	useEffect(()=>{
		console.log('ref is updated', refDoms);
		
	}, [refDoms])

	return (
		<>
		{/* <div ref={node => {onRefUpdate(node, 0)}}>test</div> */}
		{
			// 리렌더링시마다 ref값이 넘어온다
			[1,2,3,4,5,6,7,8,9,0].map((num, i) => 
				<div key={i} ref={node => {onRefUpdate(node, i)}}>{num}</div>
			)
		}
		</>
	)
}

export default ParentComp