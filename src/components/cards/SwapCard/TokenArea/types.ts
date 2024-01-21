import { type Balance, type SwapAction, type SwapStateDirection } from '../swapReducer/types'
import { type Dispatch } from 'react'

export interface TokenAreaProps {
	direction: 'to' | 'from'
	selection: SwapStateDirection
	balance?: Balance | null
	swapDispatch: Dispatch<SwapAction>
}
