import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { configureChains, createConfig } from 'wagmi'
import { sepolia } from 'viem/chains'

export const projectId = '47f2338094539d9c202f23c64a764f29'

// export const chains = [mainnet, polygon, arbitrum]
export const chains = [sepolia]
export const { publicClient, webSocketPublicClient } = configureChains(chains, [w3mProvider({ projectId })])
export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ chains, projectId }),
  publicClient,
  webSocketPublicClient,
})

export const ethereumClient = new EthereumClient(wagmiConfig, chains)
