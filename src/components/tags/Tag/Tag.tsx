import { type FC, type MouseEvent, type ReactNode } from 'react'

import className from './Tag.module.pcss'

export interface TagProps {
	leftIcon?: ReactNode
	rightIcon?: ReactNode
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void
	color: 'red' | 'green' | 'grey' | 'main' | 'mainDarker' | 'recommended' | 'cheapest' | 'fastest' | 'transparent' | 'secondary'
	isLoading?: boolean
	children?: string | JSX.Element[] | JSX.Element
	size?: 'sm' | 'md' | 'lg' | 'xxs'
	title?: string
}

export const Tag: FC<TagProps> = ({ leftIcon, rightIcon, children, size, color, onClick, title = null }) => {
	const sizeClass = size ? className[size] : className.xs

	return (
		<div className={className.container} onClick={onClick || null} style={onClick ? { cursor: 'pointer' } : null}>
			<div className={`${className.tag}  ${sizeClass} ${className[color]}`}>
				{leftIcon}
				{children}
				{title || null}
				{rightIcon}
			</div>
		</div>
	)
}
