import { type Dispatch } from 'react'
import { type SwapAction, type SwapState } from './swapReducer/types'

export interface SwapDetailsProps {
	swapState: SwapState
	swapDispatch: Dispatch<SwapAction>
}
