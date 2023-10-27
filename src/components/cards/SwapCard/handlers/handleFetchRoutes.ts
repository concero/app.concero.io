import { Dispatch, MutableRefObject } from 'react'
import { getRoutes } from './getRoutes'
import { Direction } from '../../../../types/StandardRoute'
import { Settings, SwapAction } from '../swapReducer/types'

export const handleFetchRoutes = async (
	from: Direction,
	to: Direction,
	settings: Settings,
	swapDispatch: Dispatch<SwapAction>,
	typingTimeoutRef: MutableRefObject<number | undefined>,
) => {
	try {
		if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
		const typingTimeoutId = setTimeout(() => getRoutes(from, to, settings, swapDispatch), 700)
		typingTimeoutRef.current = typingTimeoutId
	} catch (e) {
		console.error(e)
		swapDispatch({
			type: 'SET_LOADING',
			payload: false,
		})
	}
}
