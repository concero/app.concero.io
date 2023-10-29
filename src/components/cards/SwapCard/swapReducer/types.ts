import { StandardRoute } from '../../../../types/StandardRoute'
import { Provider } from '../../../../api/concero/types'
import { StageStep } from '../../../layout/SwapProgress/TransactionStep'
import { TransactionStatus } from 'rango-sdk'
import { ButtonType } from '../../../buttons/SwapButton/constants'
import { ConceroBalanceResponse } from '../../../../api/concero/fetchBalancesByChainIds'

export interface SwapStateDirection {
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

export interface ButtonState {
	type: ButtonType
	message?: string
}

export interface SwapState {
	from: SwapStateDirection
	to: SwapStateDirection
	routes: StandardRoute[]
	isLoading: boolean
	selectedRoute: any
	originalRoutes: any[]
	typingTimeout: number
	stage: 'input' | 'progress'
	steps: StageStep[]
	status: 'pending' | 'success' | 'failure' | 'awaiting'
	settings: Settings
	buttonState: ButtonState
	balance: string
	walletBalances: ConceroBalanceResponse | null
}

export interface Settings {
	slippage_percent: string
	showDestinationAddress: boolean
}

type ActionDirection = 'from' | 'to'

export enum SwapActionType {
	POPULATE_ROUTES = 'POPULATE_ROUTES',
	CLEAR_ROUTES = 'CLEAR_ROUTES',
	SET_BALANCE = 'SET_BALANCE',
	SET_LOADING = 'SET_LOADING',
	SET_SELECTED_ROUTE = 'SET_SELECTED_ROUTE',
	SET_CHAIN = 'SET_CHAIN',
	SET_TOKEN = 'SET_TOKEN',
	SET_AMOUNT = 'SET_AMOUNT',
	RESET_AMOUNTS = 'RESET_AMOUNTS',
	SET_ADDRESS = 'SET_ADDRESS',
	TOGGLE_INSURANCE = 'TOGGLE_INSURANCE',
	SET_SWAP_STAGE = 'SET_SWAP_STAGE',
	TOGGLE_SETTINGS_MODAL_OPEN = 'TOGGLE_SETTINGS_MODAL_OPEN',
	SET_SETTINGS = 'SET_SETTINGS',
	SET_SWAP_STEPS = 'SET_SWAP_STEPS',
	SET_SWAP_STATUS = 'SET_SWAP_STATUS',
	APPEND_SWAP_STEP = 'APPEND_SWAP_STEP',
	SET_TO_ADDRESS = 'SET_TO_ADDRESS',
	UPSERT_SWAP_STEP = 'UPSERT_SWAP_STEP',
	UPDATE_LAST_SWAP_STEP = 'UPDATE_LAST_SWAP_STEP',
	UPDATE_PREV_RANGO_STEPS = 'UPDATE_PREV_RANGO_STEPS',
	SET_WALLET_BALANCES = 'SET_WALLET_BALANCES',
}

export type SwapAction =
	| { type: 'POPULATE_ROUTES'; payload: any; fromAmount: string | null }
	| { type: 'CLEAR_ROUTES' }
	| { type: 'SET_BALANCE'; payload: string }
	| { type: 'SET_LOADING'; payload: boolean }
	| { type: 'SET_SELECTED_ROUTE'; payload: any }
	| { type: 'SET_CHAIN'; direction: ActionDirection; payload: { chain: any; tokens: any[] } }
	| { type: 'SET_TOKEN'; direction: ActionDirection; payload: { token: any } }
	| {
			type: 'SET_AMOUNT'
			direction: ActionDirection
			payload: { amount?: string; amount_usd?: number }
	  }
	| { type: 'RESET_AMOUNTS'; direction: ActionDirection }
	| { type: 'SET_ADDRESS'; direction: ActionDirection; payload: string }
	| { type: 'TOGGLE_INSURANCE'; payload: Response }
	| { type: 'SET_SWAP_STAGE'; payload: 'input' | 'progress' }
	| { type: 'TOGGLE_SETTINGS_MODAL_OPEN' }
	| { type: 'SET_SETTINGS'; payload: any }
	| { type: 'SET_SWAP_STEPS'; payload: any[] }
	| { type: 'SET_SWAP_STATUS'; payload: 'pending' | 'success' | 'failure' | 'awaiting' }
	| { type: 'APPEND_SWAP_STEP'; payload: any }
	| { type: 'SET_TO_ADDRESS'; payload: string }
	| { type: 'UPSERT_SWAP_STEP'; payload: any }
	| { type: 'UPDATE_LAST_SWAP_STEP' }
	| { type: 'UPDATE_PREV_RANGO_STEPS'; currentTransactionStatus: TransactionStatus }
	| { type: SwapActionType.SET_WALLET_BALANCES; balances: ConceroBalanceResponse | null }
