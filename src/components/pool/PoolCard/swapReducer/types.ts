import { type Chain, type Provider } from '../../../../api/concero/types'
import { type TransactionStatus } from 'rango-sdk'
import { type ErrorType } from '../SwapButton/constants'
import { type TokenAmount } from '../../../../utils/TokenAmount'

export enum StageType {
	approve = 1,
	requestTx = 2,
	transaction = 2,
	success = 3,
	warning = 4,
}

export type StageStepStatus = 'idle' | 'pending' | 'await' | 'success' | 'error'

export interface StageStep {
	title: string
	status: StageStepStatus
	type?: StageType
	body?: string
	txLink?: string | null | undefined
}

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
	isLpToken: boolean
}

export enum SwapCardStage {
	input = 'input',
	review = 'review',
	progress = 'progress',
	failed = 'failed',
	success = 'success',
	warning = 'warning',
}

export interface Balance {
	amount: TokenAmount
	symbol: string
}

export type PoolMode = 'deposit' | 'withdraw'

export interface SwapState {
	poolMode: PoolMode
	from: SwapStateDirection
	to: SwapStateDirection
	steps: StageStep[]

	typingTimeout: number
	stage: SwapCardStage
	settings: Settings
	balance: Balance

	isLoading: boolean
	isTestnet: boolean
	inputError: null
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
	SET_INPUT_ERROR = 'SET_INPUT_ERROR',
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
	| { type: 'SET_SWAP_STEPS'; payload: StageStep[] }
	| { type: 'APPEND_SWAP_STEP'; payload: StageStep[] }
	| { type: 'SET_TO_ADDRESS'; payload: string }
	| { type: 'UPSERT_SWAP_STEP'; payload: any }
	| { type: 'UPDATE_LAST_SWAP_STEP' }
	| { type: 'UPDATE_PREV_RANGO_STEPS'; currentTransactionStatus: TransactionStatus }
	| { type: SwapActionType.SET_WALLET_BALANCES; balances: any }
	| { type: 'SET_IS_NO_ROUTES'; status: boolean }
	| { type: 'SWAP_DIRECTIONS' }
	| { type: 'SET_IS_DESTINATION_ADDRESS_VISIBLE'; status: boolean }
	| { type: 'TOGGLE_TESTNET' }
	| { type: 'SET_IS_SUFFICIENT_LIQUIDITY'; payload: boolean }
	| { type: 'SET_INPUT_ERROR'; payload: ErrorType | null }
	| { type: 'TOGGLE_POOL_MODE'; payload: PoolMode }
