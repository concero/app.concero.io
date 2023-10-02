import { StandardRoute, Step } from '../../../../api/lifi/types'
import { Provider } from '../../../../api/concero/types'

export type Direction = {
	chain: {
		name: string
		symbol: string
		id: string
		logoURI: string
		providers: Provider[]
	}
	token: {
		name: string
		symbol: string
		address: `0x${string}` | string
		decimals: number
		logoURI: string
	}
	amount: string
	amount_usd: number
	address: string
}

export interface SwapState {
	from: Direction
	to: Direction
	routes: StandardRoute[]
	isLoading: boolean
	selectedRoute: any
	originalRoutes: any[]
	typingTimeout: number
	response: Response | null
	stage: 'input' | 'progress'
	steps: Step[]
	status: 'pending' | 'success' | 'failure' | 'awaiting'
	settings: {
		slippage_percent: string
		showDestinationAddress: boolean
	}
}

type Response = {
	provider: string
	isOk: boolean
	message: string
}

type ActionDirection = 'from' | 'to'

export type SwapAction =
	| { type: 'SET_ROUTES'; payload: any[] }
	| { type: 'POPULATE_ROUTES'; payload: any; fromAmount: string }
	| { type: 'CLEAR_ROUTES' }
	| { type: 'SET_BALANCE'; payload: string }
	| { type: 'SET_LOADING'; payload: boolean }
	| { type: 'SET_SELECTED_ROUTE'; payload: any }
	| { type: 'SET_ORIGINAL_ROUTES'; payload: any[] }
	| { type: 'SET_TYPING_TIMEOUT'; payload: number }
	| { type: 'SET_CHAIN'; direction: ActionDirection; payload: { chain: any; tokens: any[] } }
	| { type: 'SET_TOKEN'; direction: ActionDirection; payload: { token: any } }
	| {
			type: 'SET_AMOUNT'
			direction: ActionDirection
			payload: { amount?: string; amount_usd?: number }
	  }
	| { type: 'RESET_AMOUNTS'; direction: ActionDirection }
	| { type: 'SET_ADDRESS'; direction: ActionDirection; payload: string }
	| { type: 'SET_RESPONSE'; payload: Response }
	| { type: 'TOGGLE_INSURANCE'; payload: Response }
	| { type: 'SET_SWAP_STAGE'; payload: 'input' | 'progress' }
	| { type: 'TOGGLE_SETTINGS_MODAL_OPEN' }
	| { type: 'SET_SETTINGS'; payload: any }
	| { type: 'SET_SWAP_STEPS'; payload: any[] }
	| { type: 'SET_SWAP_STATUS'; payload: 'pending' | 'success' | 'failure' | 'awaiting' }
	| { type: 'APPEND_SWAP_STEP'; payload: any }
	| { type: 'SET_TO_ADDRESS'; payload: string }
	| { type: 'UPSERT_SWAP_STEP'; payload: any }
	| { type: 'SET_CHAINS'; payload: any[] }
	| { type: 'POPULATE_INIT_DATA'; payload: SwapState }
