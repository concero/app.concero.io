import type { PropsWithChildren } from 'react'
import { useState, useEffect } from 'react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { Config, WagmiProvider } from 'wagmi'
import { configEnvs } from '@/shared/consts/config/config'
import { convertToViemChain, createTransports, useChains } from '@/entities/Chain'
import { config } from '@/shared/api/wagmi'

const projectId = configEnvs.WEB3_MODAL_PROJECT_ID

export const Web3Provider = ({ children }: PropsWithChildren) => {
	const { data: chainsResponse, isLoading, isError } = useChains()
	const [wagmiConfig, setWagmiConfig] = useState<Config | null>(null)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (wagmiConfig || isLoading || !chainsResponse?.payload?.items) return

		try {
			const chainsDto = chainsResponse.payload.items.map(item => item.chain)

			if (chainsDto.length === 0) {
				console.error('No chains returned from API')
			}

			const viemChains = chainsDto.map(convertToViemChain)
			const transports = createTransports(chainsDto)

			const adapter = new WagmiAdapter({
				networks: viemChains,
				transports,
				projectId,
			})

			setWagmiConfig(adapter.wagmiConfig)
			setError(null)
		} catch (err) {
			const message = err instanceof Error ? err.message : 'Unknown error during Wagmi config init'
			console.error('[Web3Provider] Failed to initialize Wagmi:', message)
			setError(message)
		}
	}, [chainsResponse, isLoading, wagmiConfig])

	if (isLoading && !wagmiConfig) {
		return null
	}

	if (error || isError) {
		console.warn('Web3 unavailable:', error || 'Chain fetch failed')
		return <WagmiProvider config={config}>{children}</WagmiProvider>
	}

	// Готовы к работе
	if (wagmiConfig) {
		return <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
	} else {
		return <WagmiProvider config={config}>{children}</WagmiProvider>
	}
}
