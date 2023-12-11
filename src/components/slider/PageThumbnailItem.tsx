import { forwardRef, useEffect, useState } from 'react';
import { IPageThumbnailItemProps as IProps } from './ISlider';
import { toJpeg } from 'html-to-image';
import Loading from '../Loading';

export default forwardRef(function PaginationItem(
	{id, isActive, onClick, quality=0.25}: IProps, 
	// ref: ForwardedRef<HTMLElement | null>
	ref: any
){
	const [isLoading, setIsLoading] = useState(true)
	const [thumbnailUrl, setThumbnailUrl] = useState("")
	
	
	useEffect(()=>{
		console.log('[PageThumbnailItem]', thumbnailUrl, ref);
		
		if (thumbnailUrl === '' && ref) {
			toJpeg(ref, {cacheBust: true, quality: quality})
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
		<li className={isActive ? 'on' : ''} onClick={onClick}>
			{
				isLoading
					? <Loading />
					: <img src={thumbnailUrl} alt="" />
			}
		</li>
	)
})