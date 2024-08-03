import { type Dispatch, useEffect } from 'react'
import { type Config } from '@wagmi/core'
import { getBalance } from '../../../utils/getBalance'
import { type SwapAction, type SwapState } from './swapReducer/types'
import { getLpRatio } from '../../screens/PoolScreen/poolScripts/getLpRatio'

interface UseSwapCardEffectsProps {
	swapState: SwapState
	swapDispatch: Dispatch<SwapAction>
	address: string | undefined
	connector: NonNullable<Config<TPublicClient>['connector']> | undefined
}

const setLpBalance = async (swapState: SwapState, swapDispatch: Dispatch<SwapAction>) => {
	const { poolMode, from, to } = swapState

	let currentBalance = 0
	const rate = await getLpRatio()

	if (poolMode === 'deposit') {
		currentBalance = Number(from.amount) / rate // balance lp
	}
	if (poolMode === 'withdraw') {
		currentBalance = Number(from.amount) * rate // balance usdc
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
