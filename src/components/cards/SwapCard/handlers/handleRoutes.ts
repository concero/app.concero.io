import { Dispatch, MutableRefObject } from 'react'
import { SwapAction } from '../swapReducer/types'

export const clearRoutes = (typingTimeoutRef: MutableRefObject<number | undefined>, swapDispatch: Dispatch<SwapAction>) => {
	if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
	swapDispatch({ type: 'CLEAR_ROUTES' })
	swapDispatch({ type: 'RESET_AMOUNTS', direction: 'to' })
}
