import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { configureChains, createConfig } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'

export const projectId = process.env.WALLETCONNECT_PROJECT_ID

export const chains = [mainnet, polygon, arbitrum]
export const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  publicClient,
})

export const ethereumClient = new EthereumClient(wagmiConfig, chains)
