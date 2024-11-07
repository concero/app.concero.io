import type React from 'react'
import { type ReactNode } from 'react'

export interface ButtonProps {
	size?: 'sm' | 'md' | 'lg'
	variant?: 'primary' | 'secondary' | 'secondaryColor' | 'tetrary' | 'tetraryColor'
	leftIcon?: ReactNode
	rightIcon?: ReactNode
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
	isLoading?: boolean
	isDisabled?: boolean
	className?: string
	children?: ReactNode
	isFull?: boolean
}
