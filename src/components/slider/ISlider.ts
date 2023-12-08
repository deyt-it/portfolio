import { ReactElement, ReactNode } from 'react'

export interface ISliderProps {
	items: Array<ReactElement>, 
	slideWidth?: string, 
	slideHeight?: string, 
	pagination?: boolean, 
	thumbnails?: boolean, 
	thumbnailWidthDivision?: number, 
	thumbnailHeight?: string, 
	thumbnailGap?: string, 
	infinite?: boolean, 
	startIndex?: number, 
	// speed?: number, 
}

export type TDirection = -1 | 1

export interface IMoveInfo {
	direction: TDirection, 
	moveNum: number, 
}

export interface IPaginationItemProps {
	id: number, 
	type: TPaginationType, 
	className?: string, 
	onClick?: ()=>void, 
	// itemRef?: HTMLElement | null, 
}

export type TPaginationType = 'page' | 'thumbnail'