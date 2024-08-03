import { SwapCardStage } from './types'
import { ButtonType } from '../PoolButton/constants'
import { config } from '../../../../constants/config'

const mainnetTokens = {
	contractAddress: config.PARENT_POOL_CONTRACT,
	chain: {
		addressPatterns: ['^(0x)[0-9A-Fa-f]{40}$'],
		explorerURI: 'https://basescan.org',
		id: '8453',
		logoURI: 'https://api.concero.io/static/icons/chains/8453.svg',
		name: 'Base',
		symbol: 'ETH',
		tokens: [],
		providers: [],
	},
	mainToken: {
		address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
		chain_id: '8453',
		decimals: 6,
		is_popular: true,
		logoURI:
			'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png',
		name: 'USD Coin',
		priceUsd: 1,
		symbol: 'USDC',
	},
	lpToken: {
		address: config.LPTOKEN,
		chain_id: '8453',
		decimals: 18,
		is_popular: true,
		logoURI: null,
		name: 'Concero LP',
		priceUsd: null,
		symbol: 'CLP',
	},
}

const testnetTokens = {
	contractAddress: '0x42b40f42f28178998b2a4A8e5fe725F65403Ed24',
	chain: {
		addressPatterns: ['^(0x)[0-9A-Fa-f]{40}$'],
		explorerURI: 'https://sepolia.basescan.org',
		id: '84532',
		logoURI: 'https://api.concero.io/static/icons/chains/8453.svg',
		name: 'BASE sepolia',
		symbol: 'ETH',
		tokens: [],
		providers: [],
	},
	mainToken: {
		address: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
		chain_id: '84532',
		decimals: 6,
		is_popular: true,
		logoURI: 'https://sepolia.basescan.org/images/main/empty-token.png',
		name: 'Base Sepolia USDC',
		priceUsd: 1,
		symbol: 'USDC',
	},
	lpToken: {
		address: '0x459FDd324126aE6f4F4d7dE8616867f33DF0d4f6',
		chain_id: '84532',
		decimals: 18,
		is_popular: true,
		logoURI: null,
		name: 'Concero LP',
		priceUsd: null,
		symbol: 'LP',
	},
}

export const swapInitialState = () => ({
	from: {
		chain: mainnetTokens.chain,
		token: mainnetTokens.mainToken,
		amount: '',
		amount_usd: 0.0,
		address: '',
	},
	to: {
		chain: mainnetTokens.chain,
		token: mainnetTokens.lpToken,
		amount: '',
		amount_usd: 0.0,
		address: '',
	},
	poolMode: 'deposit',
	balance: null,
	routes: [],
	isNoRoutes: false,
	isLoading: false,
	selectedRoute: null,
	typingTimeout: 0,
	response: null,
	stage: SwapCardStage.input,
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
	isDestinationAddressVisible: false,
	settingsModalOpen: false,
	isTestnet: false,
})
