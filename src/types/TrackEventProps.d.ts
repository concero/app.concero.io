export interface TrackEventProps {
	action: string
	category: string
	label: string
	value?: number
	data?: Record<string, string | number | boolean | any>
}

export interface TrackTransactionProps {
	action: string
	category: string
	chain: ChainID
	value?: number
	data: Record<string, unknown>
	txhash: string
}
