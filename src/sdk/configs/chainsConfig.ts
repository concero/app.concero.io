import { type Chain } from 'viem'
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
} from 'viem/chains'

export const viemChains: Record<string, { chain: Chain; transport?: string }> = {
	[mainnet.id]: {
		chain: mainnet,
	},
	[polygon.id]: {
		chain: polygon,
	},
	[sepolia.id]: {
		chain: sepolia,
	},
	[polygonZkEvm.id]: {
		chain: polygonZkEvm,
	},
	[arbitrum.id]: {
		chain: arbitrum,
	},
	[aurora.id]: {
		chain: aurora,
	},
	[zkSync.id]: {
		chain: zkSync,
	},
	[moonriver.id]: {
		chain: moonriver,
	},
	[moonbeam.id]: {
		chain: moonbeam,
	},
	[boba.id]: {
		chain: boba,
	},
	[optimism.id]: {
		chain: optimism,
	},
	[fuse.id]: {
		chain: fuse,
	},
	[bsc.id]: {
		chain: bsc,
	},
	[avalanche.id]: {
		chain: avalanche,
	},
	[gnosis.id]: {
		chain: gnosis,
	},
	[base.id]: {
		chain: base,
	},
	[fantom.id]: {
		chain: fantom,
	},
	[okc.id]: {
		chain: okc,
	},
	[cronos.id]: {
		chain: cronos,
	},
	[linea.id]: {
		chain: linea,
	},
	[evmos.id]: {
		chain: evmos,
	},
	[baseSepolia.id]: {
		chain: baseSepolia,
		transport: 'https://base-sepolia-rpc.publicnode.com',
	},
	[arbitrumSepolia.id]: {
		chain: arbitrumSepolia,
		transport: 'https://arbitrum-sepolia-rpc.publicnode.com',
	},
	[optimismSepolia.id]: {
		chain: optimismSepolia,
	},
}
