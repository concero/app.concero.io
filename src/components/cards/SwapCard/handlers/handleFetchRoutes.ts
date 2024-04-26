import { type Dispatch, type MutableRefObject } from 'react'
import { getRoutes } from '../getRoutes/getRoutes'
import { type SwapAction, type SwapState } from '../swapReducer/types'

export const handleFetchRoutes = async (
	swapState: SwapState,
	swapDispatch: Dispatch<SwapAction>,
	typingTimeoutRef: MutableRefObject<number | undefined>,
) => {
	try {
		const { from, to, settings, isTestnet } = swapState
		if (isTestnet) {
			return
		}
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
