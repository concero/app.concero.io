import { Balance } from '../swapReducer/types'

export interface TokenAreaProps {
	direction: 'to' | 'from'
	selection: Selection
	balance?: Balance | null
	swapDispatch: any
	chains: any[]
}

type Selection = {
	chain: {
		name: string
		symbol: string
	}
	token: {
		name: string
		symbol: string
	}
	amount: string
	amount_usd: string
}
