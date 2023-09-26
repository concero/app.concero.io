export interface SwapButtonProps {
	swapState: any
	isConnected: boolean
	onClick: () => void
}

export type From = {
	amount: number
	token: {
		amount: number
		amount_usd: number
	}
}

export type To = {
	amount: number
	token: {
		amount: number
		amount_usd: number
	}
}

export type Dispatch = (action: { type: string }) => void
