import posthog from 'posthog-js'
import { type TrackEventProps } from '../types/TrackEventProps'

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
