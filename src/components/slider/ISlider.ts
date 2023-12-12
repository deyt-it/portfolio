import { ReactElement, ReactNode } from 'react'

export type TDirection = -1 | 1

export type TPaginationType = 'bullet' | 'thumbnail'

export interface ISliderProps {
	sliderClass?: string, 
	sliderId?: string, 
	items: Array<ReactElement>, 
	slideWidth: string, 
	slideHeight?: string, 
	showBullets?: boolean, 
	bulletsClass?: string, 
	showThumbnails?: boolean, 
	thumbnailWidthDivision?: number, 
	thumbnailHeight?: string, 
	thumbnailGap?: string, 
	startIndex?: number, 
	infinite?: boolean, 
	// speed?: number, 
}

export interface IPageItemProps {
	id: number, 
	isActive: boolean, 
	onClick?: ()=>void, 
	// ref?: HTMLElement | null, 
}

export interface IPageBulletItemProps extends IPageItemProps {
}

export interface IPageThumbnailItemProps extends IPageItemProps {
	quality?: number, 
}

export interface IMoveInfo {
	direction: TDirection, 
	moveNum: number, 
}