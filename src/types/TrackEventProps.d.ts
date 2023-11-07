export interface TrackEventProps {
	action: string
	category: string
	label: string
	value?: number
	data?: { [key: string]: string | number | boolean | any }
}

export interface TrackTransactionProps {
	action: string
	category: string
	chain: ChainID
	value?: number
	data: Record<string, unknown>
	txhash: string
}
