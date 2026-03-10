import type { PropsWithChildren } from 'react'
import { useEffect, useRef } from 'react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { Config, WagmiProvider } from 'wagmi'
import { configEnvs } from '@/shared/consts/config/config'
import { convertToViemChain, createTransports, useChains } from '@/entities/Chain'
import { config } from '@/shared/api/wagmi'

const projectId = configEnvs.WEB3_MODAL_PROJECT_ID

export const Web3Provider = ({ children }: PropsWithChildren) => {
	const { data: chainsResponse, isLoading, isError } = useChains()
	const wagmiConfigRef = useRef<Config | null | undefined>(null)

	useEffect(() => {
		if (wagmiConfigRef.current || isLoading || !chainsResponse?.payload?.items) return

		try {
			const chainsDto = chainsResponse.payload.items.map(item => item.chain)

			if (chainsDto.length === 0 && import.meta.env.PROD) {
				console.error('No chains returned from API')
				return
			}

			const viemChains = chainsDto.map(convertToViemChain)
			const transports = createTransports(chainsDto)

			const adapter = new WagmiAdapter({
				networks: viemChains,
				transports,
				projectId,
			})

			wagmiConfigRef.current = adapter.wagmiConfig
		} catch (err) {
			const message = err instanceof Error ? err.message : 'Unknown error during Wagmi config init'
			console.error('[Web3Provider] Failed to initialize Wagmi:', message)
		}
	}, [chainsResponse, isLoading, wagmiConfigRef.current])

	const activeConfig = wagmiConfigRef.current ? wagmiConfigRef.current : isError ? config : config

	if (isLoading && wagmiConfigRef.current === null) {
		return null
	}

	if (isError) {
		wagmiConfigRef.current = undefined
		console.log('Web3 unavailable: Chain fetch failed')
	}

	if (wagmiConfigRef.current) {
		console.log('Wagmi ready')
	} else {
		console.log('Wagmi fallback')
	}
	return <WagmiProvider config={activeConfig}>{children}</WagmiProvider>
}
