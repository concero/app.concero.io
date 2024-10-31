import { config, IS_TESTNET } from '../../../../constants/config'
import { ErrorType } from '../SwapButton/constants'

const mainnetTokens = {
	contractAddress: config.PARENT_POOL_CONTRACT,
	chain: {
		addressPatterns: ['^(0x)[0-9A-Fa-f]{40}$'],
		explorerURI: 'https://basescan.org',
		id: '8453',
		logoURI: 'https://api.concero.io/static/icons/chains/filled/8453.svg',
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
		logoURI: './conceroToken.svg',
		name: 'Concero LP',
		priceUsd: null,
		symbol: 'CLP',
	},
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
		priceUsd: 1,
		symbol: 'USDC',
	},
	lpToken: {
		address: config.LPTOKEN,
		chain_id: '84532',
		decimals: 18,
		is_popular: true,
		logoURI: null,
		name: 'Concero LP',
		priceUsd: null,
		symbol: 'LP',
	},
}

const currentToken = IS_TESTNET ? testnetTokens : mainnetTokens

export const swapInitialState = () => ({
	from: {
		chain: currentToken.chain,
		token: currentToken.mainToken,
		amount: '',
		amount_usd: 0.0,
		address: '',
	},
	to: {
		chain: currentToken.chain,
		token: currentToken.lpToken,
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
	stage: 'input',
	steps: [], // [ { status, title, body, txLink } ]
	status: 'pending', // success, failure, pending, awaiting
	settings: {
		slippage_percent: '5',
		showDestinationAddress: false,
		allowSwitchChain: true,
	},
	chains: [],
	buttonState: { type: ErrorType.ENTER_AMOUNT },
	walletBalances: null,
	isDestinationAddressVisible: false,
	settingsModalOpen: false,
	isTestnet: false,
	isWithdrawInitiated: false,
	withdrawDeadline: null,
})
