import { ReactElement, ReactNode } from 'react'

export interface ISliderProps {
	items: Array<ReactElement>, 
	width?: string, 
	pagination?: boolean, 
	thumbnails?: boolean, 
	infinite?: boolean, 
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
	itemRef: HTMLElement | null, 
}

export type TPaginationType = 'page' | 'thumbnail'