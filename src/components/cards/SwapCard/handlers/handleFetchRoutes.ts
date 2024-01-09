import { type Dispatch, type MutableRefObject } from 'react'
import { getRoutes } from '../getRoutes/getRoutes'
import { type Settings, type SwapAction, type SwapStateDirection } from '../swapReducer/types'

export const handleFetchRoutes = async (
	from: SwapStateDirection,
	to: SwapStateDirection,
	settings: Settings,
	swapDispatch: Dispatch<SwapAction>,
	typingTimeoutRef: MutableRefObject<number | undefined>,
) => {
	try {
		if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
		const typingTimeoutId = setTimeout(async () => {
			await getRoutes(from, to, settings, swapDispatch)
		}, 700)
		typingTimeoutRef.current = typingTimeoutId
	} catch (e) {
		console.error(e)
		swapDispatch({ type: 'SET_LOADING', payload: false })
	}
}
