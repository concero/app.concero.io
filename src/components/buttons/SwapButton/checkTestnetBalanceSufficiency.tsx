import { type SwapState } from '../../cards/SwapCard/swapReducer/types'
import { createPublicClient, getContract, http } from 'viem'
import { arbitrumSepolia, baseSepolia, optimismSepolia } from 'viem/chains'
import ERC20 from '../../../abi/ERC20.json'
import { linkAddressesMap } from './linkAddressesMap'

const clientsMap: Record<string, any> = {
	'84532': createPublicClient({
		chain: baseSepolia,
		transport: http(),
	}),
	'11155420': createPublicClient({
		chain: optimismSepolia,
		transport: http(),
	}),
	'421614': createPublicClient({
		chain: arbitrumSepolia,
		transport: http(),
	}),
}

export async function checkTestnetBalanceSufficiency(
	swapState: SwapState,
): Promise<{ linkBalanceSufficient: boolean; bnmBalanceSufficient: boolean } | null> {
	if (!swapState.isTestnet) {
		return null
	}

	try {
		const viemClient = clientsMap[swapState.from.chain.id]

		const bnmContract = getContract({
			address: swapState.from.token.address as `0x${string}`,
			abi: ERC20,
			client: viemClient,
		})
		const linkContract = getContract({
			address: linkAddressesMap[swapState.from.chain.id] as `0x${string}`,
			abi: ERC20,
			client: viemClient,
		})

		const [bnmBalance, linkBalance] = await Promise.all([
			bnmContract.read.balanceOf([swapState.from.address]),
			linkContract.read.balanceOf([swapState.from.address]),
		])

		// return {
		// 	linkBalanceSufficient: linkBalance.gte(0),
		// 	bnmBalanceSufficient: bnmBalance.gte(0),
		// }

		return {
			linkBalanceSufficient: false,
			bnmBalanceSufficient: false,
		}
	} catch (error) {
		console.error(error)
		return { linkBalanceSufficient: true, bnmBalanceSufficient: true }
	}
}
