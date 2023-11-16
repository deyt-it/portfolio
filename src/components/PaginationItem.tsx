import { useState } from 'react';
import { IPaginationItemProps as IProps } from './ISlider';
import { toJpeg } from 'html-to-image';

export default function PaginationItem({id, type, className, onClick, itemRef}: IProps){
	const [thumbnailUrl, setThumbnailUrl] = useState("")

	if (itemRef) {
		toJpeg(itemRef, {cacheBust: true})
		.then(url => {
			setThumbnailUrl(prev=>prev = url)
		})
		.catch(e => {
			console.log(e);
		})
	}
	
	return(
		<li className={className} onClick={onClick}>
			{
				type == 'thumbnail'
				? <img src={thumbnailUrl} alt="" />
				: id + 1
			}
		</li>
	)
}