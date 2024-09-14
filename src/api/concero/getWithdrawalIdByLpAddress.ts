import { type Address, parseAbi } from 'viem'
import { base } from 'wagmi/chains'
import { getPublicClient } from '@wagmi/core'
import { config as wagmiConfig } from '../../web3/wagmi'
import { config } from '../../constants/config'

export async function getWithdrawalIdByLpAddress(address: Address): Promise<string | null> {
	try {
		const publicClient = getPublicClient(wagmiConfig, { chainId: base.id })
		return await publicClient.readContract({
			address: config.PARENT_POOL_CONTRACT,
			abi: parseAbi(['function s_withdrawalIdByLPAddress(address) view returns (bytes32)']),
			functionName: 's_withdrawalIdByLPAddress',
			args: [address],
		})
	} catch (error) {
		console.error('Failed to get withdrawal id by lp address:', error)
		return null
	}
}
