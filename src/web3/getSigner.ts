import { createWalletClient, custom } from 'viem'
import { providers } from 'ethers'
import { type SwitchChainReturnType } from '@wagmi/core'
import { type JsonRpcSigner } from '@ethersproject/providers/src.ts/json-rpc-provider'

export async function getSigner(
	requiredChainId: number,
	switchChainAsync: Promise<SwitchChainReturnType> | null = null,
): Promise<JsonRpcSigner> {
	if (parseInt(window.ethereum.chainId) !== parseInt(requiredChainId) && switchChainAsync) {
		await switchChainAsync(Number(requiredChainId))
	}
	const client0 = createWalletClient({
		transport: custom(window.ethereum),
	})

	const provider = new providers.Web3Provider(client0.transport, 'any')
	return provider.getSigner()
}
