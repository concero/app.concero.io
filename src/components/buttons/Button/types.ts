import { type MouseEventHandler, type ReactNode } from 'react'

export interface ButtonProps {
	size?: 'sm' | 'md' | 'lg'
	variant?: 'primary' | 'secondary' | 'filled' | 'subtle' | 'tetrary' | 'light' | 'convex'
	leftIcon?: ReactNode
	rightIcon?: ReactNode
	onClick?: MouseEventHandler<HTMLButtonElement> | undefined
	isLoading?: boolean
	isDisabled?: boolean
	className?: string
	children?: ReactNode
}
