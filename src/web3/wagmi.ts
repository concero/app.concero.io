import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { configureChains, createConfig } from 'wagmi'
import {
	arbitrum,
	aurora,
	avalanche,
	base,
	boba,
	bsc,
	cronos,
	evmos,
	fantom,
	fuse,
	gnosis,
	linea,
	mainnet,
	moonbeam,
	moonriver,
	okc,
	optimism,
	polygon,
	polygonZkEvm,
	zkSync,
} from 'viem/chains'

export const projectId = process.env.WEB3_MODAL_PROJECT_ID
export const chains = [
	mainnet,
	polygon,
	polygonZkEvm,
	arbitrum,
	aurora,
	zkSync,
	moonriver,
	moonbeam,
	boba,
	optimism,
	fuse,
	bsc,
	avalanche,
	gnosis,
	base,
	fantom,
	okc,
	cronos,
	linea,
	evmos,
]
export const { publicClient, webSocketPublicClient } = configureChains(chains, [w3mProvider({ projectId })])
export const wagmiConfig = createConfig({
	autoConnect: true,
	connectors: w3mConnectors({ chains, projectId }),
	publicClient,
	webSocketPublicClient,
})
export const ethereumClient = new EthereumClient(wagmiConfig, chains)
