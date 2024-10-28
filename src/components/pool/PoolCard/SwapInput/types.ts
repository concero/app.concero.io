import { type SwapAction, type SwapState } from '../swapReducer/types'
import { type Dispatch } from 'react'

export interface SwapInputProps {
	swapState: SwapState
	swapDispatch: Dispatch<SwapAction>
}
