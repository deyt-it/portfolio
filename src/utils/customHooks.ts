import { useState, useRef, useEffect } from 'react';

const getWindowDimensions = () => {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height
	};
}

export const useWindowDimensions = () => {
	const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

	useEffect(() => {
		const onResize = () => {
			setWindowDimensions(getWindowDimensions());
		}

		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	}, []);

	return windowDimensions;
}

// export const usePrevious = (value: any) => {
// 	const ref = useRef()
// 	useEffect(()=>{
// 		ref.current = value
// 	}, [])

// 	return ref.current
// }