import styles from './IconButton.module.pcss'
import React, { forwardRef, type ReactNode } from 'react'

interface Props {
	isDisabled?: boolean
	isHovered?: boolean
	isPressed?: boolean
	children: ReactNode
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
	className?: string
	size?: 'sm' | 'md' | 'lg'
	variant?: 'default' | 'secondary' | 'secondaryColor' | 'tetrary' | 'tetraryColor'
}
/**@deprecated use from '@concero/ui-kit' */
export const IconButton = forwardRef(
	(
		{
			size = 'md',
			variant = 'default',
			isDisabled = false,
			children,
			onClick,
			className,
			isHovered,
			isPressed,
		}: Props,
		ref: React.LegacyRef<HTMLButtonElement>,
	) => {
		const classSize = styles[size]
		const classVariant = styles[variant]
		const hoverClass = isHovered ? styles.hovered : ''
		const pressedClass = isPressed ? styles.pressed : ''
		return (
			<button
				disabled={isDisabled}
				onClick={onClick}
				className={`${className} ${classSize} ${classVariant} ${styles.button} ${hoverClass} ${pressedClass}`}
				ref={ref}
			>
				{children}
			</button>
		)
	},
)
