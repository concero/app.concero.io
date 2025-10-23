import { Chain, http } from 'viem'
import { TChainDTO } from '../../types/api'

export function convertToViemChain(chainDto: TChainDTO): Chain {
	return {
		id: chainDto.id,
		name: chainDto.name,
		nativeCurrency: {
			name: chainDto.native_currency_name,
			symbol: chainDto.native_currency_symbol,
			decimals: chainDto.native_currency_decimals,
		},
		rpcUrls: {
			default: { http: chainDto.rpcs },
			public: { http: chainDto.rpcs },
		},
		testnet: chainDto.is_testnet,
	} as Chain
}

export function createTransports(chains: TChainDTO[]) {
	const transports: Record<number, ReturnType<typeof http>> = {}
	for (const chain of chains) {
		// Защита от пустых RPC
		const rpc = chain.rpcs[0] ?? 'https://rpc.ankr.com/eth' // fallback
		transports[chain.id] = http(rpc)
	}
	return transports
}
