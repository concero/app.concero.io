import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig, mainnet } from 'wagmi'

import { publicProvider } from 'wagmi/providers/public'
import { EthereumClient } from '@web3modal/ethereum'

export const projectId = process.env.WALLETCONNECT_PROJECT_ID

export const { chains, publicClient, webSocketPublicClient } = configureChains([mainnet], [publicProvider()])

export const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId: projectId,
  chains,
})

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

export const ethereumClient = new EthereumClient(wagmiConfig, chains)
