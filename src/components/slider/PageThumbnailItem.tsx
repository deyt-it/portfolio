import { forwardRef, useEffect, useState } from 'react';
import { IPageThumbnailItemProps as IProps } from './ISlider';
import { toJpeg } from 'html-to-image';
import Loading from '../Loading';
import { MdPlayCircleFilled } from "react-icons/md";

export default forwardRef(function PaginationItem(
	{id, isActive, onClick, quality=0.25}: IProps, 
	// ref: ForwardedRef<HTMLElement | null>
	ref: any
){
	const [isLoading, setIsLoading] = useState(true)
	const [thumbnailUrl, setThumbnailUrl] = useState("")
	const [isVideo, setIsVideo] = useState(false)
	
	
	useEffect(()=>{
		// console.log('[PageThumbnailItem]', ref);
		
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

		if (ref && ref.children[0].tagName === 'IMG') {
			setIsVideo(ref.children[0].src.split('.').reverse()[0] === 'gif')
		}
	}, [ref])
	
	return(
		<li className={isActive ? 'on' : ''} onClick={onClick}>
			{
				isLoading
					? <Loading />
					: <img src={thumbnailUrl} alt="" />
			}
			{
				isVideo &&
					<MdPlayCircleFilled className="ico" />
			}
		</li>
	)
})