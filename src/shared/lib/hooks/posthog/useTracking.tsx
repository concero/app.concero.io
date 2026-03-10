import posthog from 'posthog-js'
interface TrackEventProps {
	action: string
	category: string
	label: string
	value?: number
	data?: Record<string, string | number | boolean | any>
}

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
