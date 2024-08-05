import { createConfig, http } from 'wagmi'
import { createPublicClient, fallback } from 'viem'
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
} from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { config as appConfig } from '../constants/config'

export const projectId = appConfig.WEB3_MODAL_PROJECT_ID
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
	sepolia,
	baseSepolia,
	arbitrumSepolia,
	optimismSepolia,
]

// 2. Create wagmiConfig
const metadata = {
	name: 'Concero',
	description: 'Concero',
	url: appConfig.CONCERO_DOMAIN_URL,
	icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

export const config = createConfig({
	chains: [
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
	],
	transports: {
		[mainnet.id]: http(),
		[sepolia.id]: http(),
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
	},
	connectors: [
		walletConnect({ projectId, metadata, showQrModal: false }),
		injected({ shimDisconnect: true }),
		coinbaseWallet({
			appName: metadata.name,
			appLogoUrl: metadata.icons[0],
		}),
	],
})

// 3. Create modal
createWeb3Modal({
	wagmiConfig: config,
	projectId,
	enableAnalytics: true,
})

export const publicClient = createPublicClient({
	chain: mainnet,
	transport: http(),
})
