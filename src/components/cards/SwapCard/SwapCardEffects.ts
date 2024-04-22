import { type Dispatch, type MutableRefObject, useContext, useEffect } from 'react'
import { type Config } from '@wagmi/core'
import { getBalance } from '../../../utils/getBalance'
import { clearRoutes } from './handlers/handleRoutes'
import { handleFetchRoutes } from './handlers/handleFetchRoutes'
import { type SwapAction, type SwapState } from './swapReducer/types'
import { setHistoryCard } from './handlers/setHistoryCard'
import { setSwapCard } from './handlers/setSwapCard'
import { SelectionContext } from '../../../hooks/SelectionContext'
import { testnetTokens } from '../../modals/TokensModal/testnetTokens'
import { testnetChains } from '../../modals/TokensModal/ChainsPicker/testnetChains'

interface UseSwapCardEffectsProps {
	swapState: SwapState
	swapDispatch: Dispatch<SwapAction>
	address: string | undefined
	typingTimeoutRef: MutableRefObject<number | undefined>
	connector: NonNullable<Config<TPublicClient>['connector']> | undefined
}

export function useSwapCardEffects({
	swapState,
	swapDispatch,
	address,
	typingTimeoutRef,
	connector,
}: UseSwapCardEffectsProps) {
	const { selectionDispatch } = useContext(SelectionContext)
	const { from, to, settings, selectedRoute } = swapState

	useEffect(() => {
		setHistoryCard(selectionDispatch, from, to)
		setSwapCard(selectionDispatch, from, to)
	}, [from.token.address, to.token.address])

	useEffect(() => {
		void getBalance({ dispatch: swapDispatch, from, address })
	}, [from.token.address, from.chain.id, address])

	useEffect(() => {
		clearRoutes(typingTimeoutRef, swapDispatch)
		void handleFetchRoutes(from, to, settings, swapDispatch, typingTimeoutRef)
		return () => {
			clearRoutes(typingTimeoutRef, swapDispatch)
		}
	}, [
		from.token,
		from.amount,
		from.chain,
		to.token,
		to.chain,
		settings.slippage_percent,
		settings.allowSwitchChain,
		to.address,
	])

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

	// testnet useEffects

	useEffect(() => {
		if (swapState.isTestnet) {
			swapDispatch({ type: 'SET_TOKEN', payload: { token: testnetTokens['84532'][0] }, direction: 'from' })
			swapDispatch({ type: 'SET_TOKEN', payload: { token: testnetTokens['11155420'][0] }, direction: 'to' })
			swapDispatch({
				type: 'SET_CHAIN',
				payload: {
					chain: testnetChains[2],
				},
				direction: 'from',
			})
			swapDispatch({
				type: 'SET_CHAIN',
				payload: {
					chain: testnetChains[1],
				},
				direction: 'to',
			})
		}
	}, [swapState.isTestnet])
}
