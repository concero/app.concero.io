import { type SwapState } from './types'
import { ButtonType } from '../../../buttons/SwapButton/constants'

export const swapInitialState = (selection): SwapState => ({
	from: {
		chain: selection.swapCard.from.chain,
		token: selection.swapCard.from.token,
		amount: '',
		amount_usd: 0.0,
		address: '',
	},
	to: {
		chain: selection.swapCard.to.chain,
		token: selection.swapCard.to.token,
		amount: '',
		amount_usd: 0.0,
		address: '',
	},
	balance: null,
	routes: [],
	isNoRoutes: false,
	isLoading: false,
	selectedRoute: null,
	typingTimeout: 0,
	response: null,
	stage: 'input', // input, progress
	steps: [], // [ { status, title, body, txLink } ]
	status: 'pending', // success, failure, pending, awaiting
	settings: {
		slippage_percent: '5',
		showDestinationAddress: false,
		allowSwitchChain: true,
	},
	chains: [],
	buttonState: { type: ButtonType.ENTER_AMOUNT },
	walletBalances: null,
})
