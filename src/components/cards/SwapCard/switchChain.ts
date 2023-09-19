import { createWalletClient, custom } from 'viem'
import { providers } from 'ethers'
import { useSwitchNetwork } from 'wagmi'

export const switchChain = async (requiredChainId) => {
  const { switchNetworkAsync } = useSwitchNetwork()
  if (switchNetworkAsync) await switchNetworkAsync(requiredChainId)
  const client0 = createWalletClient({
    transport: custom(window.ethereum),
  })

  const provider = new providers.Web3Provider(client0.transport, 'any')
  return provider.getSigner()
}
