import { Chain, fallback, http } from 'viem'
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
	const transports: Record<number, ReturnType<typeof fallback>> = {}

	for (const chain of chains) {
		if (!chain.rpcs?.length) continue // skip invalid chains

		transports[chain.id] = fallback(
			chain.rpcs.map(url => http(url.trim(), { batch: true })),
			{ retryCount: 3, retryDelay: 1000 },
		)
	}

	return transports
}
