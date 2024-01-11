import { type Dispatch, type MutableRefObject, useEffect } from 'react'
import { type Config } from '@wagmi/core'
import { setHistoryCard } from './handlers/setHistoryCard'
import { getBalance } from '../../../utils/getBalance'
import { clearRoutes } from './handlers/handleRoutes'
import { handleFetchRoutes } from './handlers/handleFetchRoutes'
import { type SwapAction, type SwapState } from './swapReducer/types'
import { setSwapCard } from './handlers/setSwapCard'

interface UseSwapCardEffectsProps {
	swapState: SwapState
	swapDispatch: Dispatch<SwapAction>
	address: string
	dispatch: Dispatch<any>
	typingTimeoutRef: MutableRefObject<number | undefined>
	connector: NonNullable<Config<TPublicClient>['connector']> | undefined
}

export function useSwapCardEffects({ swapState, swapDispatch, address, dispatch, typingTimeoutRef, connector }: UseSwapCardEffectsProps) {
	const { from, to, settings, selectedRoute } = swapState

	useEffect(() => {
		setHistoryCard(dispatch, from, to)
		setSwapCard(dispatch, from, to)
	}, [from.token.address, to.token.address])

	useEffect(() => {
		getBalance({ dispatch: swapDispatch, from, address })
	}, [from.token.address, from.chain.id, address])

	useEffect(() => {
		clearRoutes(typingTimeoutRef, swapDispatch)
		handleFetchRoutes(from, to, settings, swapDispatch, typingTimeoutRef)
		return () => {
			clearRoutes(typingTimeoutRef, swapDispatch)
		}
	}, [from.token, from.amount, from.chain, to.token, to.chain, settings.slippage_percent, settings.allowSwitchChain])

	useEffect(() => {
		if (!selectedRoute) return
		swapDispatch({
			type: 'SET_AMOUNT',
			direction: 'to',
			payload: {
				amount: selectedRoute.to.token.amount,
				amount_usd: selectedRoute.to.token.amount_usd,
			},
		})
	}, [selectedRoute])

	useEffect(() => {
		if (!connector) return
		const allowSwitchChain = connector.name !== 'WalletConnect'
		swapDispatch({ type: 'SET_SETTINGS', payload: { allowSwitchChain } })
	}, [connector?.id])

	useEffect(() => {
		swapDispatch({ type: 'SET_ADDRESS', direction: 'from', payload: address })
		swapDispatch({ type: 'SET_ADDRESS', direction: 'to', payload: address })
	}, [address])
}
