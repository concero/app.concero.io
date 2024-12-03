import posthog from 'posthog-js'
import { type TrackEventProps } from '../types/TrackEventProps'

// Standalone function for trackEvent
export const trackEvent = async ({ category, action, label, data }: TrackEventProps) => {
	try {
		posthog.capture(action, {
			label,
			category,
			...data,
		})
	} catch (error) {
		console.error('trackEvent error', error)
	}
}
