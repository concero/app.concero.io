import { type SwapState } from '../../cards/SwapCard/swapReducer/types'
import { createPublicClient, getContract, http } from 'viem'
import { arbitrumSepolia, baseSepolia, optimismSepolia } from 'viem/chains'
import ERC20 from '../../../abi/ERC20.json'
import { linkAddressesMap } from './linkAddressesMap'

const viemChainsMap: Record<string, any> = {
	'84532': baseSepolia,
	'11155420': optimismSepolia,
	'421614': arbitrumSepolia,
}

export async function checkTestnetBalanceSufficiency(
	swapState: SwapState,
): Promise<{ linkBalanceSufficient: boolean; bnmBalanceSufficient: boolean } | null> {
	if (!swapState.isTestnet) {
		return null
	}

	try {
		const viemClient = createPublicClient({
			chain: viemChainsMap[swapState.from.chain.id],
			transport: http(),
		})

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

		return {
			linkBalanceSufficient: linkBalance.gte(0),
			bnmBalanceSufficient: bnmBalance.gte(0),
		}
	} catch (error) {
		console.error(error)
		return { linkBalanceSufficient: true, bnmBalanceSufficient: true }
	}
}
