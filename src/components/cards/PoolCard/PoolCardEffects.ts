import { type Dispatch, useEffect } from 'react'
import { type Config } from '@wagmi/core'
import { getBalance } from '../../../utils/getBalance'
import { type SwapAction, type SwapState } from './swapReducer/types'
import { calculateLpAmount, calculateWithdrawableAmount } from '../../../api/concero/poolLpTokens'
import { formatUnits, parseUnits } from 'viem'

interface UseSwapCardEffectsProps {
	swapState: SwapState
	swapDispatch: Dispatch<SwapAction>
	address: string | undefined
	connector: NonNullable<Config<TPublicClient>['connector']> | undefined
}

const setLpBalance = async (swapState: SwapState, swapDispatch: Dispatch<SwapAction>) => {
	const { poolMode, from, to } = swapState

	let currentBalance = 0

	if (!from.amount || from.amount === '0') return

	const amountInDecimals = parseUnits(from.amount, from.token.decimals)

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
			amount: currentBalance,
			amount_usd: poolMode === 'deposit' ? from.amount : from.amount,
		},
	})
}

export function useSwapCardEffects({ swapState, swapDispatch, address }: UseSwapCardEffectsProps) {
	const { from, to, poolMode } = swapState

	useEffect(() => {
		void getBalance({ dispatch: swapDispatch, from, address })
	}, [from.token.address, from.chain.id, address, from.amount])

	useEffect(() => {
		void setLpBalance(swapState, swapDispatch)
	}, [from.amount])

	useEffect(() => {
		swapDispatch({ type: 'SET_ADDRESS', direction: 'from', payload: address })
		swapDispatch({ type: 'SET_ADDRESS', direction: 'to', payload: address })
	}, [address])
}
