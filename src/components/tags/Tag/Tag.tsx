import { type FC, type MouseEvent, type ReactNode } from 'react'

import className from './Tag.module.pcss'

export interface TagProps {
	leftIcon?: ReactNode
	rightIcon?: ReactNode
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void
	variant?: 'branded' | 'positive' | 'negative' | 'warning' | 'neutral'
	isLoading?: boolean
	children?: ReactNode
	size?: 'sm' | 'md'
	title?: string
}

export const Tag: FC<TagProps> = ({
	leftIcon,
	rightIcon,
	children,
	size = 'md',
	variant = 'branded',
	onClick,
	title = null,
}) => {
	const sizeClass = className[size]

	return (
		<div className={className.container} onClick={onClick || null} style={onClick ? { cursor: 'pointer' } : null}>
			<div className={`${className.tag}  ${sizeClass} ${className[variant]}`}>
				{leftIcon}
				{children}
				{title || null}
				{rightIcon}
			</div>
		</div>
	)
}
