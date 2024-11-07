import { type FC, type MouseEvent, type ReactNode } from 'react'

import className from './Tag.module.pcss'

export interface TagProps {
	leftIcon?: ReactNode
	rightIcon?: ReactNode
	onClick?: (event: MouseEvent<HTMLDivElement>) => void
	variant?: 'branded' | 'positive' | 'negative' | 'warning' | 'neutral'
	isLoading?: boolean
	children?: ReactNode
	size?: 'sm' | 'md'
}

export const Tag: FC<TagProps> = ({ leftIcon, rightIcon, children, size = 'md', variant = 'branded', onClick }) => {
	const sizeClass = className[size]

	return (
		<div
			className={`${className.tag} ${sizeClass} ${className[variant]}`}
			onClick={onClick}
			style={{ cursor: onClick ? 'pointer' : 'default' }}
		>
			{leftIcon}
			<p>{children}</p>
			{rightIcon}
		</div>
	)
}
