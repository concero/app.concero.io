export interface TrackEventProps {
	action: string
	category: string
	label: string
	value?: number
	data?: Record<string, string | number | boolean | any>
}
