import { type Balance, type SwapAction, type SwapCardStage, type SwapStateDirection } from '../swapReducer/types'
import { type Dispatch } from 'react'
import { type ErrorType } from '../SwapButton/constants'

export interface TokenAreaProps {
	direction: 'to' | 'from'
	selection: SwapStateDirection
	balance?: Balance | null
	swapDispatch: Dispatch<SwapAction>
	isLoading?: boolean
	stage: SwapCardStage
	error?: ErrorType | null
	balanceLoading?: boolean
	setBalanceLoading?: Dispatch<boolean>
}
