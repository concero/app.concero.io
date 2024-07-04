import { type Dispatch, useContext, useEffect } from 'react'
import { type Config } from '@wagmi/core'
import { getBalance } from '../../../utils/getBalance'
import { type SwapAction, type SwapState } from './swapReducer/types'
import { setHistoryCard } from './handlers/setHistoryCard'
import { setSwapCard } from './handlers/setSwapCard'
import { SelectionContext } from '../../../hooks/SelectionContext'

interface UseSwapCardEffectsProps {
	swapState: SwapState
	swapDispatch: Dispatch<SwapAction>
	address: string | undefined
	connector: NonNullable<Config<TPublicClient>['connector']> | undefined
}

export function useSwapCardEffects({ swapState, swapDispatch, address, connector }: UseSwapCardEffectsProps) {
	const { selectionDispatch } = useContext(SelectionContext)
	const { from, to, selectedRoute, isTestnet } = swapState

	useEffect(() => {
		setHistoryCard(selectionDispatch, from, to)
		setSwapCard(selectionDispatch, from, to)
	}, [from.token.address, to.token.address])

	useEffect(() => {
		if (isTestnet) return
		void getBalance({ dispatch: swapDispatch, from, address })
	}, [from.token.address, from.chain.id, address])

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
	}, [selectedRoute, isTestnet])

	useEffect(() => {
		if (!connector) return
		const allowSwitchChain = connector.name !== 'WalletConnect'
		swapDispatch({ type: 'SET_SETTINGS', payload: { allowSwitchChain } })
	}, [connector?.id])

	useEffect(() => {
		swapDispatch({ type: 'SET_ADDRESS', direction: 'from', payload: address })
	}, [address])
}
