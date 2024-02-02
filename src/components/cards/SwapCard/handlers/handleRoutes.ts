import { type Dispatch, type MutableRefObject } from 'react'
import { type SwapAction, SwapCardStage } from '../swapReducer/types'

export const clearRoutes = (
	typingTimeoutRef: MutableRefObject<number | undefined>,
	swapDispatch: Dispatch<SwapAction>,
) => {
	if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
	swapDispatch({ type: 'CLEAR_ROUTES' })
	swapDispatch({ type: 'RESET_AMOUNTS', direction: 'to' })
	swapDispatch({ type: 'SET_IS_NO_ROUTES', status: false })
	swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.input })
}
