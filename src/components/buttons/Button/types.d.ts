import { type ReactNode } from 'react'

export interface ButtonProps {
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'sq-xs' | 'sq-sm' | 'sq-md' | 'sq-lg' | 'sq-xl'
	variant?: 'primary' | 'secondary' | 'filled' | 'subtle' | 'black'
	leftIcon?: ReactNode
	rightIcon?: ReactNode
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void
	isLoading?: boolean
	isDisabled?: boolean
	className?: string
	children?: ReactNode
}
