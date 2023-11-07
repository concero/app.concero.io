import { useCallback, useEffect } from 'react'
import posthog from 'posthog-js'
import { useAccount } from 'wagmi'
import { TrackEventProps } from '../types/TrackEventProps'

export const useTracking = () => {
	const { address, isConnected } = useAccount()

	useEffect(() => {
		if (isConnected) {
			posthog.identify(address)
		}
	}, [address, isConnected])

	const trackTransaction = useCallback(() => {
		console.log('trackTransaction')
	}, [])

	const trackEvent = useCallback(async ({ category, action, label, data }: TrackEventProps) => {
		console.log('trackEvent', action, label, category, data)
		posthog.capture(action, {
			label,
			category,
			...data,
		})
	}, [])
	return {
		trackTransaction,
		trackEvent,
	}
}
