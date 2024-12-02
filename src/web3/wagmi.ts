import { http } from 'wagmi'
import { fallback } from 'viem'
import {
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
import { config as appConfig } from '../constants/config'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { createAppKit } from '@reown/appkit/react'
import { type AppKitNetwork } from '@reown/appkit/networks'

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
	]),
	[polygonZkEvm.id]: http(),
	[arbitrum.id]: fallback([
		http('https://arb1.arbitrum.io/rpc'),
		http('https://arbitrum.public-rpc.com'),
		http('https://arb1.arbitrum.io/rpc'),
		http(),
	]),
	[aurora.id]: http(),
	[zkSync.id]: http(),
	[moonriver.id]: http(),
	[moonbeam.id]: http(),
	[boba.id]: http(),
	[optimism.id]: http(),
	[fuse.id]: http(),
	[bsc.id]: http(),
	[avalanche.id]: fallback([
		http('https://api.avax.network/ext/bc/C/rpc'),
		http('https://rpc.ankr.com/avalanche'),
		http('https://avalanche.public-rpc.com'),
		http(),
	]),
	[gnosis.id]: http(),
	[base.id]: fallback([
		http('https://base-rpc.publicnode.com'),
		http('https://base.blockpi.network/v1/rpc/public'),
		http('https://public.stackup.sh/api/v1/node/base-mainnet'),
		http(),
		http('https://mainnet.base.org'),
	]),
	[fantom.id]: http(),
	[okc.id]: http(),
	[cronos.id]: http(),
	[linea.id]: http(),
	[evmos.id]: http(),
	[sepolia.id]: http(),
	[baseSepolia.id]: http(),
	[arbitrumSepolia.id]: http('https://arbitrum-sepolia-rpc.publicnode.com'),
	[optimismSepolia.id]: http(),
})

const transports = createTransports()

export const wagmiAdapter = new WagmiAdapter({
	networks: chains,
	transports,
	projectId,
})

createAppKit({
	adapters: [wagmiAdapter],
	networks: chains,
	metadata,
	projectId,
	features: {
		socials: false,
		analytics: true,
		email: false,
		onramp: false,
		swaps: false,
	},
})

export const config = wagmiAdapter.wagmiConfig
