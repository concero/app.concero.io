import { createWalletClient, custom } from 'viem'
import { providers } from 'ethers'
import { useSwitchChain } from 'wagmi'

export const switchChain = async requiredChainId => {
	const { switchChainAsync } = useSwitchChain()
	if (switchChainAsync) await switchChainAsync(requiredChainId)
	const client0 = createWalletClient({
		transport: custom(window.ethereum),
	})

	const provider = new providers.Web3Provider(client0.transport, 'any')
	return provider.getSigner()
}
