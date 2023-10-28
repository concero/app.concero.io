import { fetchRangoRoutes } from '../../../../api/rango/fetchRangoRoutes'
import { fetchLifiRoutes } from '../../../../api/lifi/fetchLifiRoutes'
import { StandardRoute } from '../../../../types/StandardRoute'
import { Settings, SwapAction, SwapActionType, SwapStateDirection } from '../swapReducer/types'
import { Dispatch } from 'react'
import { ButtonType } from '../../../buttons/SwapButton/constants'
import { GetLifiRoutes, GetRangoRoutes, PopulateRoutes } from './types'

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
		console.log(error)
	}
}

const getRangoRoutes = async ({ routes, from, to, settings, swapDispatch }: GetRangoRoutes): Promise<void | StandardRoute[] | []> => {
	try {
		const rangoRoutes: StandardRoute[] = await fetchRangoRoutes({ from, to, settings })
		routes.push(...rangoRoutes)
		populateRoutes({ routes, from, swapDispatch })
		return rangoRoutes
	} catch (error) {
		console.log('rangoRoutes', error)
	}
}

function setButtonState(routes: StandardRoute[], swapDispatch: Dispatch<SwapAction>) {
	if (routes.length === 0) {
		swapDispatch({ type: SwapActionType.SET_BUTTON_STATE, buttonType: ButtonType.NO_ROUTES })
	}
}

export const getRoutes = async (from: SwapStateDirection, to: SwapStateDirection, settings: Settings, swapDispatch: Dispatch<SwapAction>): Promise<void> => {
	if (!from.amount) return
	swapDispatch({ type: 'SET_LOADING', payload: true })
	swapDispatch({ type: SwapActionType.SET_BUTTON_STATE, buttonType: ButtonType.LOADING })

	const routes: StandardRoute[] | [] = []

	try {
		await Promise.all([getLifiRoutes({ routes, from, to, settings, swapDispatch }), getRangoRoutes({ routes, from, to, settings, swapDispatch })])
		// await checkInsufficientGasAndFeeOnAllSteps(routes, swapDispatch, from.address)
		setButtonState(routes, swapDispatch)
	} catch (error) {
		console.log(error)
	} finally {
		swapDispatch({ type: 'SET_LOADING', payload: false })
	}
}
