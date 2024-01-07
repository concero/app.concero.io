import { type WalletClient } from 'wagmi'
import { providers } from 'ethers'
import { getPublicClient, getWalletClient, type PublicClient } from '@wagmi/core'
import { type HttpTransport } from 'viem'
import { type JsonRpcSigner } from '@ethersproject/providers/src.ts/json-rpc-provider'
import { trackEvent } from '../hooks/useTracking'
import { action, category } from '../constants/tracking'

// // viem to ethers
// let client0
// let provider
// export let viemSigner
//
// if (window.ethereum) {
// 	client0 = createWalletClient({
// 		transport: custom(window.ethereum),
// 	})
//
// 	provider = new providers.Web3Provider(client0.transport, 'any')
// 	viemSigner = provider.getSigner()
// } else {
// 	console.error('Ethereum is not supported in this browser.')
// }

function publicClientToProvider(publicClient: PublicClient) {
	const { chain, transport } = publicClient
	const network = {
		chainId: chain.id,
		name: chain.name,
		ensAddress: chain.contracts?.ensRegistry?.address,
	}
	if (transport.type === 'fallback') {
		return new providers.FallbackProvider((transport.transports as Array<ReturnType<HttpTransport>>).map(({ value }) => new providers.JsonRpcProvider(value?.url, network)))
	}
	return new providers.JsonRpcProvider(transport.url, network)
}

/** Action to convert a viem Public Client to an ethers.js Provider. */
function getEthersProvider({ chainId }: { chainId?: number } = {}) {
	const publicClient = getPublicClient({ chainId })
	return publicClientToProvider(publicClient)
}

function walletClientToSigner(walletClient: WalletClient) {
	const { account, chain, transport } = walletClient
	const network = {
		chainId: chain.id,
		name: chain.name,
		ensAddress: chain.contracts?.ensRegistry?.address,
	}
	const provider = new providers.Web3Provider(transport, network)
	const signer = provider.getSigner(account.address)
	return signer
}

/** Action to convert a viem Wallet Client to an ethers.js Signer. */
export async function getEthersSigner(chainId: number): Promise<JsonRpcSigner | undefined> {
	const walletClient = await getWalletClient({ chainId })
	if (!walletClient) {
		trackEvent({
			category: category.Wallet,
			action: action.WalletClientNotFound,
			label: 'WalletClient not found',
		})
		return undefined
	} else {
		return walletClientToSigner(walletClient)
	}
}
