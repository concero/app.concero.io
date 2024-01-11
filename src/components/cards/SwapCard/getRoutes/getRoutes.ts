import { fetchRangoRoutes } from '../../../../api/rango/fetchRangoRoutes'
import { fetchLifiRoutes } from '../../../../api/lifi/fetchLifiRoutes'
import { type StandardRoute } from '../../../../types/StandardRoute'
import { type Settings, type SwapAction, type SwapStateDirection } from '../swapReducer/types'
import { type Dispatch } from 'react'
import { type GetLifiRoutes, type GetRangoRoutes, type PopulateRoutes } from './types'
import { fetchWalletBalancesOnStepChains } from './fetchWalletBalancesOnStepChains'
import { trackEvent } from '../../../../hooks/useTracking'
import { action, category } from '../../../../constants/tracking'

const populateRoutes = ({ routes, from, swapDispatch }: PopulateRoutes) => {
	swapDispatch({
		type: 'POPULATE_ROUTES',
		payload: routes,
		fromAmount: from.amount,
	})
}

const getLifiRoutes = async ({ routes, from, to, settings, swapDispatch }: GetLifiRoutes): Promise<void | StandardRoute[] | []> => {
	try {
		const lifiRoutes: StandardRoute[] | [] = await fetchLifiRoutes({ from, to, settings })
		routes.unshift(...lifiRoutes)
		populateRoutes({ routes, from, swapDispatch })
		return lifiRoutes
	} catch (error) {
		trackEvent({ category: category.SwapCard, action: action.FetchLifiRoutesError, label: 'fetch_lifi_routes_error', data: { error } })
		console.error(error)
	}
}

const getRangoRoutes = async ({ routes, from, to, settings, swapDispatch }: GetRangoRoutes): Promise<void | StandardRoute[] | []> => {
	try {
		const rangoRoutes: StandardRoute[] = await fetchRangoRoutes({ from, to, settings })
		routes.push(...rangoRoutes)
		populateRoutes({ routes, from, swapDispatch })
		return rangoRoutes
	} catch (error) {
		trackEvent({ category: category.SwapCard, action: action.FetchRangoRoutesError, label: 'fetch_rango_routes_error', data: { error } })
		console.error('rangoRoutes', error)
	}
}

export const getRoutes = async (from: SwapStateDirection, to: SwapStateDirection, settings: Settings, swapDispatch: Dispatch<SwapAction>): Promise<void> => {
	if (!from.amount || !parseFloat(from.amount)) return
	swapDispatch({ type: 'SET_LOADING', payload: true })
	const routes: StandardRoute[] = []

	try {
		await Promise.all([getLifiRoutes({ routes, from, to, settings, swapDispatch }), getRangoRoutes({ routes, from, to, settings, swapDispatch })])

		if (!routes.length) {
			swapDispatch({ type: 'SET_IS_NO_ROUTES', status: true })
		}

		await fetchWalletBalancesOnStepChains(routes, swapDispatch, from.address)
	} catch (error) {
		console.error(error)
	} finally {
		swapDispatch({ type: 'SET_LOADING', payload: false })
	}
}
