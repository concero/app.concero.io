import { type MouseEventHandler, type ReactNode } from 'react'

export interface ButtonProps {
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'sq-xs' | 'sq-sm' | 'sq-md' | 'sq-lg' | 'sq-xl'
	variant?: 'primary' | 'secondary' | 'filled' | 'subtle' | 'black' | 'light' | 'convex'
	leftIcon?: ReactNode
	rightIcon?: ReactNode
	onClick?: MouseEventHandler<HTMLButtonElement> | undefined
	isLoading?: boolean
	isDisabled?: boolean
	className?: string
	children?: ReactNode
}
