import { isFloatInput } from '../../../../utils/validation'
import { SwapCardStage } from '../swapReducer/types'
import type { ForwardedRef, MutableRefObject } from 'react'

export const handleAreaClick = (
	inputRef: MutableRefObject<ForwardedRef<HTMLInputElement> | undefined>,
	stage: SwapCardStage,
) => {
	if (stage === SwapCardStage.review) {
		return
	}

	if (inputRef.current) {
		inputRef.current.focus()
	}
}

export const handleAmountChange = ({ value, state, dispatch, direction }) => {
	if (value === '') {
		return dispatch({
			type: 'RESET_AMOUNTS',
			direction,
		})
	}

	if (!isFloatInput(value)) return

	dispatch({
		type: 'SET_AMOUNT',
		direction,
		payload: { amount: value, amount_usd: (state.currentTokenPriceUSD * parseFloat(value)).toFixed(2).toString() },
	})
}
