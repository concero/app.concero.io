import { type MouseEventHandler } from 'react'
import { type ErrorType } from './constants'

export interface SwapButtonProps {
	isLoading: boolean
	error: ErrorType | null
	onClick?: ((event: MouseEventHandler) => void) | undefined
}
