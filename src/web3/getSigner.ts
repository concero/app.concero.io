import { createWalletClient, custom } from 'viem'
import { providers } from 'ethers'
import { SwitchNetworkResult } from '@wagmi/core'

export async function getSigner(requiredChainId: number, switchNetworkAsync: Promise<SwitchNetworkResult>) {
	if (parseInt(window.ethereum.chainId) !== parseInt(requiredChainId) && switchNetworkAsync) {
		await switchNetworkAsync(Number(requiredChainId))
	}
	const client0 = createWalletClient({
		transport: custom(window.ethereum),
	})

	const provider = new providers.Web3Provider(client0.transport, 'any')
	return provider.getSigner()
}
