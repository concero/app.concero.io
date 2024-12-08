import { type SwapAction, SwapCardStage, type SwapState } from '../swapReducer/types'
import type { Dispatch, MutableRefObject } from 'react'
import { formatUnits, parseUnits } from 'viem'
import { calculateLpAmount, calculateWithdrawableAmount } from '../../../../api/concero/pool/poolLpTokens'
import { getInputError } from './getInputError'

export const setLpBalance = async (
	swapState: SwapState,
	swapDispatch: Dispatch<SwapAction>,
	typingTimeoutRef: MutableRefObject<number | undefined>,
) => {
	const { poolMode, from, to /* balance */ } = swapState

	if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
	swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.input })

	const typingTimeoutId = setTimeout(async () => {
		const error = getInputError(swapState)
		swapDispatch({ type: 'SET_INPUT_ERROR', payload: error })

		let currentBalance = 0
		const amountInDecimals = parseUnits(from.amount, from.token.decimals)

		swapDispatch({ type: 'SET_LOADING', payload: true })

		if (poolMode === 'deposit') {
			const lpAmount = await calculateLpAmount(amountInDecimals)
			currentBalance = Number(formatUnits(lpAmount, to.token.decimals))
		}
		if (poolMode === 'withdraw') {
			const usdcAmount = await calculateWithdrawableAmount(amountInDecimals)
			currentBalance = Number(formatUnits(usdcAmount, to.token.decimals))
		}

		swapDispatch({
			type: 'SET_AMOUNT',
			direction: 'to',
			payload: {
				amount: String(currentBalance),
				amount_usd: Number(from.amount),
			},
		})

		swapDispatch({ type: 'SET_LOADING', payload: false })
		swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.review })
	}, 700)

	typingTimeoutRef.current = typingTimeoutId
}
