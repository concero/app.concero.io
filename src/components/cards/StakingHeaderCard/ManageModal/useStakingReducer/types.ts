import { ModalType, Status } from '../constants'
import { EnsoRouteResponse } from '../../../../../api/enso/types'

interface Token {
	name: string
	symbol: string
	logoURI: string
	address: string
	decimals: number
}

interface Chain {
	name: string
	symbol: string
	logoURI: string
	id: number
}

export interface IStep {
	title: string
	body?: string
	status: 'pending' | 'success' | 'error' | 'await'
	txLink?: string
}

export interface ManageState {
	from: {
		amount: string
		amount_usd: string
		token: Token
		chain: Chain
	}
	to: {
		amount: string
		amount_usd: string
		token: Token
		chain: Chain
	}
	snake: boolean
	modalType: ModalType
	direction: string
	route: EnsoRouteResponse | null
	swapType: number
	address: string
	isLoading: boolean
	status: Status
	balance: string | null
	steps: IStep[]
}

export type ManageAction =
	| { type: 'SET_MODAL_TYPE'; payload: ModalType }
	| { type: 'SET_CHAIN'; direction: string; payload: any; tokens: any[] }
	| { type: 'SET_TOKEN'; direction: string; payload: any }
	| { type: 'SET_SWAP_TYPE'; payload: string }
	| { type: 'SET_AMOUNT'; direction: string; amount: string }
	| { type: 'SET_AMOUNT_USD'; direction: string; amount: string | null }
	| { type: 'SET_ADDRESS'; payload: string }
	| { type: 'SET_CHAIN_BY_VAULT'; direction: string; payload: any }
	| { type: 'SET_ROUTE'; fromAmount: string; payload: EnsoRouteResponse; gasUsd: string | null; toAmountUsd: string | null }
	| { type: 'CLEAR_ROUTE' }
	| { type: 'SET_LOADING'; payload: boolean }
	| { type: 'SET_STATUS'; payload: Status }
	| { type: 'SET_BALANCE'; payload: number }
	| { type: 'SET_TO_SELECTION'; payload: any }
	| { type: 'SET_FROM_SELECTION'; token: Token; chain: Chain }
	| { type: 'RESET'; payload: any }
	| { type: 'SET_WITHDRAW_TYPE'; token: Token }
	| { type: 'SET_STAKE_TYPE' }
	| { type: 'SWITCH_TYPE' }
	| { type: 'PUSH_STEP'; step: IStep }
	| { type: 'SET_STEPS'; steps: [] }
