import { type SwapAction, type SwapState } from '../swapReducer/types'
import type React from 'react'
import { type Dispatch } from 'react'

export interface SwapInputProps {
	swapState: SwapState
	swapDispatch: Dispatch<SwapAction>
	onClose: (e: React.MouseEvent<HTMLButtonElement>) => void
}
