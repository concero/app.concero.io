import { type FC, type MouseEvent, type ReactNode } from 'react'

import classNames from './Tag.module.pcss'

export interface TagProps {
	leftIcon?: ReactNode
	rightIcon?: ReactNode
	onClick?: (event: MouseEvent<HTMLDivElement>) => void
	variant?: 'branded' | 'positive' | 'negative' | 'warning' | 'neutral'
	className?: string
	isLoading?: boolean
	children: ReactNode
	size?: 'sm' | 'md'
}
/**@deprecated use from '@concero/ui-kit' */
export const Tag: FC<TagProps> = ({
	leftIcon,
	rightIcon,
	children,
	size = 'md',
	variant = 'branded',
	onClick,
	className,
}) => {
	const sizeClass = classNames[size]

	return (
		<div
			className={`${classNames.tag} ${sizeClass} ${classNames[variant]} ${className}`}
			onClick={onClick}
			style={{ cursor: onClick ? 'pointer' : 'default' }}
		>
			{leftIcon}
			<p>{children}</p>
			{rightIcon}
		</div>
	)
}
