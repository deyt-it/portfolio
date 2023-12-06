import { ForwardedRef, forwardRef, useEffect, useState } from 'react';
import { IPaginationItemProps as IProps } from './ISlider';
import { toJpeg } from 'html-to-image';
import Loading from './Loading';

export default forwardRef(function PaginationItem(
	{id, type, className, onClick}: IProps, 
	// itemRef: ForwardedRef<HTMLElement | null>
	itemRef: any
){
	const [thumbnailUrl, setThumbnailUrl] = useState("")
	console.log('[PaginationItem]', itemRef);
	
	
	useEffect(()=>{
		console.log(1, itemRef);
		
		if (itemRef) {
			toJpeg(itemRef, {cacheBust: true})
			.then(url => {
				setThumbnailUrl(prev=>prev = url)
			})
			.catch(e => {
				console.log(e);
			})
		}
	}, [itemRef])
	
	return(
		<li className={className} onClick={onClick}>
			{
				type == 'thumbnail'
				? itemRef
					? <img src={thumbnailUrl} alt="" />
					: <Loading />	
				: id + 1
			}
		</li>
	)
})