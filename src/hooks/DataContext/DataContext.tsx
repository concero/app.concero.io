import { createContext, useState } from 'react'
import { fetchTokens } from '../../api/concero/fetchTokens'
import { fetchChains } from '../../api/concero/fetchChains'
import { config } from '../../constants/config'
import { type DataContextValue, type DataProviderProps, type GetChainsParams } from './types'
import { type Chain } from '../../api/concero/types'

export const initialState = {
	tokens: {
		'11155111': [
			{
				name: 'USDC',
				symbol: 'USDC',
				address: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
				logoURI:
					'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png',
				decimals: 18,
				coinGeckoId: 'ethereum',
				is_popular: true,
				priceUsd: null,
			},
		],
		'421614': [
			{
				name: 'USDC',
				symbol: 'USDC',
				address: '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d',
				logoURI:
					'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png',
				decimals: 18,
				coinGeckoId: 'matic-network',
				is_popular: true,
				priceUsd: null,
			},
		],
	},
	chains: [
		{
			id: '11155111 ',
			name: 'Sepolia',
			symbol: 'ETH',
			addressPatterns: ['^(0x)[0-9A-Fa-f]{40}$'],
			logoURI: `${config.CONCERO_ASSETS_URI}/icons/chains/filled/1.svg`,
			explorerURI: 'https://etherscan.io',
			providers: [
				{
					name: 'lifi',
					symbol: 'ETH',
				},
				{
					name: 'rango',
					symbol: 'ETH',
				},
			],
		},
		{
			id: '421614',
			name: 'Arb Sepolia',
			symbol: 'ETH',
			addressPatterns: ['^(0x)[0-9A-Fa-f]{40}$'],
			logoURI: `${config.CONCERO_ASSETS_URI}/icons/chains/filled/42161.svg`,
			explorerURI: 'https://polygonscan.com',
			providers: [
				{
					name: 'lifi',
					symbol: 'MATIC',
				},
				{
					name: 'rango',
					symbol: 'POLYGON',
				},
			],
		},
	],
}

export const DataContext = createContext<DataContextValue>({
	getTokens: async () => [],
	getChains: async () => [],
	tokens: {},
	chains: [],
	setTokens: () => {},
	setChains: () => {},
	getChainByProviderSymbol: async () => null,
})

export function DataProvider({ children }: DataProviderProps) {
	const [tokens, setTokens] = useState(initialState.tokens)
	const [chains, setChains] = useState(initialState.chains)

	const getTokens = async ({ chainId, offset = 0, limit = 15, search }: GetChainsParams) => {
		if (search) {
			return await fetchTokens({ chainId, offset, limit, search })
		}

		if (tokens[chainId]?.length >= offset + limit) {
			return tokens[chainId].slice(offset, offset + limit)
		}
		// if (tokens[chainId]?.length < limit) {
		// 	return tokens[chainId]
		// }

		const response = await fetchTokens({ chainId, offset, limit, search })

		setTokens(prevTokens => {
			const existingTokens = prevTokens[chainId] || []
			return { ...prevTokens, [chainId]: [...existingTokens, ...response] }
		})
		return response
	}

	const getChains = async ({ chainId, offset, limit, search }: GetChainsParams): Promise<Chain[]> => {
		if (search) {
			return await fetchChains({ search })
		}
		if (chains.length >= offset + limit) {
			return chains.slice(offset, offset + limit)
		}

		const response = await fetchChains({ chainId, offset, limit })
		setChains(prevChains => [...prevChains, ...response])
		return response
	}

	async function getChainByProviderSymbol(providerSymbol: string): Promise<Chain | null> {
		const chains = await getChains({})
		const index = chains.findIndex((chain: Chain) =>
			chain.providers.some(provider => provider.symbol === providerSymbol),
		)
		return index !== -1 ? chains[index] : null
	}

	// const initialFetch = async () => {
	// 	const [ethTokens, polygonTokens, fetchedChains] = await Promise.all([
	// 		fetchTokens({ chainId: '1', offset: 0, limit: 15 }),
	// 		fetchTokens({ chainId: '137', offset: 0, limit: 15 }),
	// 		fetchChains({ offset: 0, limit: 20 }),
	// 	])
	//
	// 	setTokens({ '1': ethTokens, '137': polygonTokens })
	// 	setChains(fetchedChains)
	// }
	//
	// useEffect(() => {
	// 	void initialFetch()
	// }, [])

	return (
		<DataContext.Provider
			value={{ getTokens, getChains, tokens, chains, setTokens, setChains, getChainByProviderSymbol }}
		>
			{children}
		</DataContext.Provider>
	)
}
