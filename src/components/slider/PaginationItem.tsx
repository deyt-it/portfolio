import { ForwardedRef, forwardRef, useEffect, useState } from 'react';
import { IPaginationItemProps as IProps } from './ISlider';
import { toJpeg } from 'html-to-image';
import Loading from '../Loading';

export default forwardRef(function PaginationItem(
	{id, type, className, onClick}: IProps, 
	// ref: ForwardedRef<HTMLElement | null>
	ref: any
){
	console.log('[PaginationItem]', ref);
	const [isLoading, setIsLoading] = useState(true)
	const [thumbnailUrl, setThumbnailUrl] = useState("")
	
	
	useEffect(()=>{
		console.log(1, ref);
		
		if (ref) {
			toJpeg(ref, {cacheBust: true})
			.then(url => {
				setIsLoading(false)
				setThumbnailUrl(url)
			})
			.catch(e => {
				console.log(e);
			})
		}
	}, [ref])
	
	return(
		<li className={className} onClick={onClick}>
			{
				type == 'thumbnail'
				? isLoading
					? <Loading />
					: <img src={thumbnailUrl} alt="" />
				: id + 1
			}
		</li>
	)
})