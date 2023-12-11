import { useState } from 'react';
import { IPageBulletItemProps as IProps } from './ISlider';

export default function PaginationItem(
	{id, isActive, onClick}: IProps, 
){
	// console.log('[PageBulletItem]');
	
	return(
		<li className={isActive ? 'on' : ''} onClick={onClick}>
			{ id + 1 }
		</li>
	)
}