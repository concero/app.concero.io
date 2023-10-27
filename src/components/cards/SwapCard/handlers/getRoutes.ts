import { fetchRangoRoutes } from '../../../../api/rango/fetchRangoRoutes'
import { fetchLifiRoutes } from '../../../../api/lifi/fetchLifiRoutes'
import { Direction, StandardRoute } from '../../../../types/StandardRoute'
import { Settings, SwapAction } from '../swapReducer/types'
import { Dispatch } from 'react'

interface PopulateRoutesProps {
	routes: StandardRoute[] | []
	from: Direction
	swapDispatch: Dispatch<SwapAction>
}

const populateRoutes = ({ routes, from, swapDispatch }: PopulateRoutesProps) => {
	swapDispatch({
		type: 'POPULATE_ROUTES',
		payload: routes,
		fromAmount: from.amount,
	})
}

interface GetLifiRoutesProps {
	routes: StandardRoute[] | []
	from: Direction
	to: Direction
	settings: Settings
	swapDispatch: Dispatch<SwapAction>
}

const getLifiRoutes = async ({ routes, from, to, settings, swapDispatch }: GetLifiRoutesProps): Promise<void | StandardRoute[] | []> => {
	try {
		const lifiRoutes: StandardRoute[] | [] = await fetchLifiRoutes({ from, to, settings })
		routes.unshift(...lifiRoutes)
		populateRoutes({ routes, from, swapDispatch })
		return lifiRoutes // Return the lifiRoutes for Promise.all
	} catch (error) {
		console.log(error)
		// throw error // Re-throw the error to be caught by Promise.all
	}
}

interface GetRangoRoutesProps {
	routes: StandardRoute[] | []
	from: Direction
	to: Direction
	settings: Settings
	swapDispatch: Dispatch<SwapAction>
}

const getRangoRoutes = async ({ routes, from, to, settings, swapDispatch }: GetRangoRoutesProps): Promise<void | StandardRoute[] | []> => {
	try {
		const rangoRoutes: StandardRoute[] = await fetchRangoRoutes({ from, to, settings })
		console.log('standard rango route: ', rangoRoutes)
		routes.push(...rangoRoutes)
		populateRoutes({ routes, from, swapDispatch })
		return rangoRoutes // Return the rangoRoutes for Promise.all
	} catch (error) {
		console.log('rangoRoutes', error)
		// throw error // Re-throw the error to be caught by Promise.all
	}
}

export const getRoutes = async (from: Direction, to: Direction, settings: Settings, swapDispatch: Dispatch<SwapAction>): Promise<void> => {
	if (!from.amount) return
	swapDispatch({ type: 'SET_LOADING', payload: true })

	const routes: StandardRoute[] | [] = []

	try {
		await Promise.all([getLifiRoutes({ routes, from, to, settings, swapDispatch }), getRangoRoutes({ routes, from, to, settings, swapDispatch })])

		if (routes.length === 0) {
			swapDispatch({
				type: 'SET_RESPONSE',
				payload: {
					isOk: false,
					message: 'No routes found',
				},
			})
		}
		// Handle the fulfilled promises here if needed
		// lifiRoutes and rangoRoutes contain the resolved values
	} catch (error) {
		console.log(error)
	} finally {
		swapDispatch({ type: 'SET_LOADING', payload: false })
	}
}
