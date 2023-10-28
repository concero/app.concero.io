import { Dispatch, MutableRefObject } from 'react'
import { SwapAction, SwapActionType } from '../swapReducer/types'
import { ButtonType } from '../../../buttons/SwapButton/constants'

export const clearRoutes = (typingTimeoutRef: MutableRefObject<number | undefined>, swapDispatch: Dispatch<SwapAction>) => {
	if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
	swapDispatch({ type: 'CLEAR_ROUTES' })
	swapDispatch({ type: 'RESET_AMOUNTS', direction: 'to' })
	swapDispatch({ type: SwapActionType.SET_BUTTON_STATE, buttonType: ButtonType.ENTER_AMOUNT })
}
