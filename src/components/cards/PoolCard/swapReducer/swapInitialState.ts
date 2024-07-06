import { SwapCardStage, type SwapState } from './types'
import { ButtonType } from '../../../buttons/SwapButton/constants'
import { config } from '../../../../constants/config'

// TODO change to mainnet on release
const mainnetTokens = {
	chain: {
		addressPatterns: ['^(0x)[0-9A-Fa-f]{40}$'],
		explorerURI: 'https://basescan.org',
		id: '8453',
		logoURI: 'https://api.concero.io/static/icons/chains/8453.svg',
		name: 'Base Mainnet',
		symbol: 'ETH',
		tokens: [],
		providers: [],
	},
	mainToken: {
		address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
		chain_id: '8453',
		decimals: 18,
		is_popular: true,
		logoURI: 'https://basescan.org/token/images/centre-usdc_28.png',
		name: 'USDC',
		priceUsd: null,
		symbol: 'USDC',
	},
	lpToken: null,
}

const testnetTokens = {
	contractAddress: config.PARENT_POOL_CONTRACT,
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
		priceUsd: null,
		symbol: 'USDC',
	},
	lpToken: {
		address: '0x7BC475A2E15Bc4DBB5c9307c9Cd20e54cfc35A68',
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
		chain: testnetTokens.chain,
		token: testnetTokens.mainToken,
		amount: '',
		amount_usd: 0.0,
		address: '',
	},
	to: {
		chain: testnetTokens.chain,
		token: testnetTokens.lpToken,
		amount: '',
		amount_usd: 0.0,
		address: testnetTokens.contractAddress,
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
	isTestnet: true,
})
