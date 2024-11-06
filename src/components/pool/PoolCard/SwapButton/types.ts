import type React from 'react'
import { type MouseEventHandler } from 'react'
import { type ErrorType } from './constants'

export interface SwapButtonProps {
	isLoading: boolean
	error: ErrorType | null
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
	isDeposit: boolean
}
