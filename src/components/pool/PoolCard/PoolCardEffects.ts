import { type Dispatch, type MutableRefObject, useEffect } from 'react'
import { getBalance } from '../../../utils/getBalance'
import { type SwapAction, type SwapState } from './swapReducer/types'
import { checkLastWithdrawRequest } from '../../../api/concero/getUserActions'
import { setLpBalance } from './handlers/setLpBalance'

interface UseSwapCardEffectsProps {
	swapState: SwapState
	swapDispatch: Dispatch<SwapAction>
	address: string | undefined
	typingTimeoutRef: MutableRefObject<number | undefined>
}

export function useSwapCardEffects({ swapState, swapDispatch, address, typingTimeoutRef }: UseSwapCardEffectsProps) {
	const { from } = swapState

	useEffect(() => {
		void getBalance({ dispatch: swapDispatch, from, address })
	}, [from.token.address, from.chain.id, address, from.amount])

	useEffect(() => {
		void setLpBalance(swapState, swapDispatch, typingTimeoutRef)
	}, [from.amount])

	useEffect(() => {
		if (swapState.poolMode !== 'withdraw') return
		if (!address) return

		checkLastWithdrawRequest(address).then(lastWithdrawAction => {
			if (lastWithdrawAction) {
				swapDispatch({ type: 'SET_IS_WITHDRAW_INITIATED', payload: true })
				swapDispatch({ type: 'SET_ACTUAL_WITHDRAW_DEADLINE', payload: lastWithdrawAction.deadline })
			}
		})
	}, [address, swapState.poolMode])

	useEffect(() => {
		swapDispatch({ type: 'SET_ADDRESS', direction: 'from', payload: address })
		swapDispatch({ type: 'SET_ADDRESS', direction: 'to', payload: address })
	}, [address])
}
