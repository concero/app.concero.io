import { useCallback, useEffect } from 'react'
import posthog from 'posthog-js'
import { useAccount } from 'wagmi'
import { TrackEventProps } from '../types/TrackEventProps'
import { action, category } from '../constants/tracking'

// Standalone function for trackTransaction
export const trackTransaction = () => {
	console.log('trackTransaction')
}

// Standalone function for trackEvent
export const trackEvent = async ({ category, action, label, data }: TrackEventProps) => {
	try {
		// console.log('trackEvent', action, label, category, data)
		posthog.capture(action, {
			label,
			category,
			...data,
		})
	} catch (error) {
		console.error('trackEvent error', error)
	}
}

// Hook that utilizes the standalone functions
export const useTracking = () => {
	const { address, isConnected } = useAccount()

	useEffect(() => {
		if (isConnected) {
			posthog.identify(address)
			trackEvent({
				category: category.Wallet,
				action: action.ConnectWalletSuccess,
				label: 'Wallet Connected',
			})
		}
	}, [isConnected])

	// Use callbacks to reference the standalone functions
	const memoizedTrackTransaction = useCallback(trackTransaction, [])
	const memoizedTrackEvent = useCallback(trackEvent, [])

	return {
		trackTransaction: memoizedTrackTransaction,
		trackEvent: memoizedTrackEvent,
	}
}
