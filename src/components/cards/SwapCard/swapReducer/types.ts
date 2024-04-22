import { type StandardRoute } from '../../../../types/StandardRoute'
import { type Chain, type Provider } from '../../../../api/concero/types'
import { type StageStep } from '../../EarnHeaderCard/ManageModal/SwapProgress/TransactionStep'
import { type TransactionStatus } from 'rango-sdk'
import { type ButtonType } from '../../../buttons/SwapButton/constants'
import { type ConceroBalanceResponse } from '../../../../api/concero/fetchBalancesByChainIds'
import { type TokenAmount } from '../../../../utils/TokenAmount'

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
		coinGeckoId: string
		priceUsd: number | null
	}
	amount: string
	amount_usd: number
	address: string
}

export interface ButtonState {
	type: ButtonType
	message?: string
}

export enum SwapCardStage {
	input = 'input',
	progress = 'progress',
	review = 'review',
	failed = 'failed',
	success = 'success',
	contactSupport = 'contactSupport',
}

export interface Balance {
	amount: TokenAmount
	symbol: string
}

export interface SwapState {
	settingsModalOpen: boolean
	from: SwapStateDirection
	to: SwapStateDirection
	routes: StandardRoute[]
	isNoRoutes: boolean
	isLoading: boolean
	selectedRoute: StandardRoute | null
	typingTimeout: number
	stage: SwapCardStage
	steps: StageStep[]
	settings: Settings
	buttonState: ButtonState
	balance: Balance
	walletBalances: ConceroBalanceResponse | null
	isDestinationAddressVisible: boolean
	isTestnet: boolean
}

export interface Settings {
	slippage_percent: string
	showDestinationAddress: boolean
	allowSwitchChain: boolean
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
	| { type: 'SET_BALANCE'; payload: Balance | null }
	| { type: 'SET_LOADING'; payload: boolean }
	| { type: 'SET_SELECTED_ROUTE'; payload: any }
	| { type: 'SET_CHAIN'; direction: ActionDirection; payload: { chain: Chain } }
	| { type: 'SET_TOKEN'; direction: ActionDirection; payload: { token: Token } }
	| {
			type: 'SET_AMOUNT'
			direction: ActionDirection
			payload: { amount?: string; amount_usd?: number }
	  }
	| { type: 'RESET_AMOUNTS'; direction: ActionDirection }
	| { type: 'SET_ADDRESS'; direction: ActionDirection; payload: string }
	| { type: 'TOGGLE_INSURANCE'; payload: Response }
	| { type: 'SET_SWAP_STAGE'; payload: SwapCardStage }
	| { type: 'TOGGLE_SETTINGS_MODAL_OPEN' }
	| { type: 'SET_SETTINGS'; payload: any }
	| { type: 'SET_SWAP_STEPS'; payload: any[] }
	| { type: 'APPEND_SWAP_STEP'; payload: any }
	| { type: 'SET_TO_ADDRESS'; payload: string }
	| { type: 'UPSERT_SWAP_STEP'; payload: any }
	| { type: 'UPDATE_LAST_SWAP_STEP' }
	| { type: 'UPDATE_PREV_RANGO_STEPS'; currentTransactionStatus: TransactionStatus }
	| { type: SwapActionType.SET_WALLET_BALANCES; balances: ConceroBalanceResponse | null }
	| { type: 'SET_IS_NO_ROUTES'; status: boolean }
	| { type: 'SWAP_DIRECTIONS' }
	| { type: 'SET_IS_DESTINATION_ADDRESS_VISIBLE'; status: boolean }
	| { type: 'TOGGLE_TESTNET' }
