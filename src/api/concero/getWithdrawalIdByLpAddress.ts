import { type Address, parseAbi } from 'viem'
import { getPublicClient } from '@wagmi/core'
import { config as wagmiConfig } from '../../web3/wagmi'
import { config, PARENT_POOL_CHAIN_ID } from '../../constants/config'

export async function getWithdrawalIdByLpAddress(address: Address): Promise<string | null> {
	try {
		const publicClient = getPublicClient(wagmiConfig, { chainId: PARENT_POOL_CHAIN_ID })
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
