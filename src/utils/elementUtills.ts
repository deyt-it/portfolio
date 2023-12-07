import { ReactElement } from 'react';

export const getElementByType = (el: ReactElement, type: string, setEl: (arg: ReactElement)=>ReactElement): (ReactElement | null) => {
	// const props = ['props']
	// console.log('?????', el[props[0] as keyof typeof el]);
	
	// const setEl = (fx: (el: ReactElement)=>void) => fx(el)

	
	if (el.type === type) {
		return setEl(el)
	}
	if (typeof el.props.children !== 'object'){
		return null
	}
	
	if (Array.isArray(el.props.children)) {
		for (let index = 0; index < el.props.children.length; index++) {
			// 형제요소중 type조건 만나면 반복 종료
			const elSetted = getElementByType(el.props.children[index], type, setEl)
			if (elSetted) {
				const result = {...el, 
					props: {...el.props, 
						children: [...el.props.children]
					}
				}
				result.props.children[index] = elSetted
				// console.log(1, result);
				
				return result
			}
		}
		// children배열에 조건맞는 type이 없는 경우
		return null

	}else{
		const elSetted = getElementByType(el.props.children, type, setEl)
		return elSetted
		? {...el, 
			props: {...el.props, 
				children: elSetted
			}
		}
		: null
	}
	



	// if (el.type === type) {
	// 	return true
	// }
	// if (typeof el.props.children !== 'object'){
	// 	return false
	// }
	
	// if (Array.isArray(el.props.children)) {
	// 	for (let index = 0; index < el.props.children.length; index++) {
	// 		// 형제요소중 type조건 만나면 반복 종료
	// 		const hasType = getElementByType(el.props.children[index], type)
	// 		if (hasType) {
	// 			return true
	// 		}
	// 	}
	// 	// children배열에 조건맞는 type이 없는 경우
	// 	return false
	// }else{
	// 	return getElementByType(el.props.children, type)
	// }

}