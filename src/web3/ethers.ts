import { type HttpTransport, type PublicClient, type WalletClient } from 'viem'
import { FallbackProvider, JsonRpcProvider, Web3Provider } from '@ethersproject/providers'
import { getPublicClient, getWalletClient } from '@wagmi/core'
import { type JsonRpcSigner } from '@ethersproject/providers/src.ts/json-rpc-provider'
import { trackEvent } from '../hooks/useTracking'
import { action, category } from '../constants/tracking'
import { config } from './wagmi'

function publicClientToProvider(publicClient: PublicClient) {
	const { chain, transport } = publicClient
	const network = {
		chainId: chain.id,
		name: chain.name,
		ensAddress: chain.contracts?.ensRegistry?.address,
	}
	if (transport.type === 'fallback') {
		return new FallbackProvider(
			(transport.transports as Array<ReturnType<HttpTransport>>).map(
				({ value }) => new JsonRpcProvider(value?.url, network),
			),
		)
	}
	return new JsonRpcProvider(transport.url, network)
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
	const provider = new Web3Provider(transport, network)
	const signer = provider.getSigner(account.address)
	return signer
}

/** Action to convert a viem Wallet Client to an ethers.js Signer. */
export async function getEthersSigner(chainId: number): Promise<JsonRpcSigner | undefined> {
	const walletClient = await getWalletClient(config, { chainId })
	if (!walletClient) {
		void trackEvent({
			category: category.Wallet,
			action: action.WalletClientNotFound,
			label: 'WalletClient not found',
		})
		return undefined
	} else {
		return walletClientToSigner(walletClient)
	}
}
/*


Way to get ethers-like signer, without using ethers.js
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'

const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })

const client = createWalletClient({
  account,
  chain: mainnet,
  transport: custom(window.ethereum)
})

client is a wallet client, which has similar methods to ethers.js Signer
 */
