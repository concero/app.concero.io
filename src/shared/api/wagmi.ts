import { http, createConfig } from 'wagmi'
import { createPublicClient, fallback, createWalletClient } from 'viem'
import {
	type AppKitNetwork,
	arbitrum,
	arbitrumSepolia,
	aurora,
	avalanche,
	base,
	baseSepolia,
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
	optimismSepolia,
	polygon,
	polygonZkEvm,
	sepolia,
	zkSync,
} from '@reown/appkit/networks'
import { config as appConfig } from '@/constants/config'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { createAppKit } from '@reown/appkit/react'

export const projectId = appConfig.WEB3_MODAL_PROJECT_ID

const chains: [AppKitNetwork, ...AppKitNetwork[]] = [
	mainnet,
	polygon,
	sepolia,
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
	baseSepolia,
	arbitrumSepolia,
	optimismSepolia,
]

const metadata = {
	name: 'Concero',
	description: 'Concero',
	url: appConfig.CONCERO_DOMAIN_URL,
	icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

const createTransports = () => ({
	[mainnet.id]: http(),
	[polygon.id]: fallback([
		http('https://polygon.publicnode.com'),
		http('https://polygon.drpc.org'),
		http('https://rpc.ankr.com/polygon'),
		http('https://public.stackup.sh/api/v1/node/polygon-mainnet'),
		http(),
	]),
	[polygonZkEvm.id]: http(),
	[arbitrum.id]: fallback([
		http('https://arbitrum-one.publicnode.com'),
		http('https://rpc.ankr.com/arbitrum'),
		http('https://arb1.arbitrum.io/rpc'),
		http('https://arbitrum.blockpi.network/v1/rpc/public'),
		http(),
	]),
	[aurora.id]: http(),
	[zkSync.id]: http(),
	[moonriver.id]: http(),
	[moonbeam.id]: http(),
	[boba.id]: http(),
	[optimism.id]: fallback([
		http('https://1rpc.io/op'),
		http('https://optimism-rpc.publicnode.com'),
		http('https://optimism.drpc.org'),
		http('https://endpoints.omniatech.io/v1/op/mainnet/public'),
		http(),
	]),
	[fuse.id]: http(),
	[bsc.id]: http(),
	[avalanche.id]: fallback([
		http('https://avalanche-c-chain-rpc.publicnode.com'),
		http('https://avalanche.drpc.org'),
		http('https://rpc.ankr.com/avalanche'),
		http('https://avalanche.public-rpc.com'),
		http(),
	]),
	[gnosis.id]: http(),
	[base.id]: fallback([
		http('https://1rpc.io/base'),
		http('https://base-rpc.publicnode.com'),
		http('https://base.blockpi.network/v1/rpc/public'),
		http('https://public.stackup.sh/api/v1/node/base-mainnet'),
		http('https://base.drpc.org'),
		http(),
	]),
	[fantom.id]: http(),
	[okc.id]: http(),
	[cronos.id]: http(),
	[linea.id]: http(),
	[evmos.id]: http(),
	[sepolia.id]: http(),
	[baseSepolia.id]: http('https://base-sepolia-rpc.publicnode.com'),
	[arbitrumSepolia.id]: http('https://arbitrum-sepolia-rpc.publicnode.com'),
	[optimismSepolia.id]: http(),
})

export const transports = createTransports()

export const wagmiAdapter = new WagmiAdapter({
	networks: chains,
	transports,
	ssr: true,
	projectId,
})

createAppKit({
	adapters: [wagmiAdapter],
	networks: chains,
	metadata,
	projectId,
	features: {
		send: false,
		socials: false,
		analytics: true,
		email: false,
		onramp: false,
		swaps: false,
	},
})

export const config = wagmiAdapter.wagmiConfig

export const configChainsViem = {
	[mainnet.id]: mainnet,
	[polygon.id]: polygon,
	[arbitrum.id]: arbitrum,
	[avalanche.id]: avalanche,
	[optimism.id]: optimism,
	[base.id]: base,
}

export const viemChains: Record<number, { chain: any; transport: any }> = {
	[mainnet.id]: { chain: mainnet, transport: http() },
	[polygon.id]: {
		chain: polygon,
		transport: fallback([
			http('https://polygon.publicnode.com'),
			http('https://polygon.drpc.org'),
			http('https://rpc.ankr.com/polygon'),
			http('https://public.stackup.sh/api/v1/node/polygon-mainnet'),
			http(),
		]),
	},
	[arbitrum.id]: {
		chain: arbitrum,
		transport: fallback([
			http('https://arbitrum-one.publicnode.com'),
			http('https://rpc.ankr.com/arbitrum'),
			http('https://arb1.arbitrum.io/rpc'),
			http('https://arbitrum.blockpi.network/v1/rpc/public'),
			http(),
		]),
	},
	[avalanche.id]: {
		chain: avalanche,
		transport: fallback([
			http('https://avalanche-c-chain-rpc.publicnode.com'),
			http('https://avalanche.drpc.org'),
			http('https://rpc.ankr.com/avalanche'),
			http('https://avalanche.public-rpc.com'),
			http(),
		]),
	},
	[base.id]: {
		chain: base,
		transport: fallback([
			http('https://1rpc.io/base'),
			http('https://base-rpc.publicnode.com'),
			http('https://base.blockpi.network/v1/rpc/public'),
			http('https://public.stackup.sh/api/v1/node/base-mainnet'),
			http('https://base.drpc.org'),
			http(),
		]),
	},
	[optimism.id]: {
		chain: optimism,
		transport: fallback([
			http('https://1rpc.io/op'),
			http('https://optimism-rpc.publicnode.com'),
			http('https://optimism.drpc.org'),
			http('https://endpoints.omniatech.io/v1/op/mainnet/public'),
			http(),
		]),
	},
	[baseSepolia.id]: {
		chain: baseSepolia,
		transport: http('https://base-sepolia-rpc.publicnode.com'),
	},
}

export const getPublicClient = (chainId: number) => {
	const chainConfig = viemChains[chainId]
	if (!chainConfig) {
		throw new Error(`Unsupported chain ID: ${chainId}`)
	}
	return createPublicClient({
		chain: chainConfig.chain,
		transport: chainConfig.transport,
	})
}

export const getWalletClient = async (chainId: number) => {
	const chainConfig = viemChains[chainId]
	if (!chainConfig) {
		throw new Error(`Unsupported chain ID: ${chainId}`)
	}
	return createWalletClient({
		chain: chainConfig.chain,
		transport: chainConfig.transport,
	})
}
