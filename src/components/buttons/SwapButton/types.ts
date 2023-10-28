import { SwapState } from '../../cards/SwapCard/swapReducer/types'

export interface SwapButtonProps {
	swapState: SwapState
	isConnected: boolean
	onClick: () => void
}
