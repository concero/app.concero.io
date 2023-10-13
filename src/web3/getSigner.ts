import { createWalletClient, custom } from 'viem'
import { providers } from 'ethers'
import { SwitchNetworkArgs, SwitchNetworkResult } from '@wagmi/core'

type SwitchChainNetwork = (chainId_?: SwitchNetworkArgs['chainId']) => Promise<SwitchNetworkResult>

export async function getSigner(requiredChainId: number, switchNetworkAsync: SwitchChainNetwork) {
	if (Number(window.ethereum.chainId) !== requiredChainId && switchNetworkAsync) {
		await switchNetworkAsync(requiredChainId)
	}
	const client0 = createWalletClient({
		transport: custom(window.ethereum),
	})

	const provider = new providers.Web3Provider(client0.transport, 'any')
	return provider.getSigner()
}
