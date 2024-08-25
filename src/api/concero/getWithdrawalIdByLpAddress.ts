import { type Address, parseAbi } from 'viem'
import { base } from 'wagmi/chains'
import { getPublicClient } from '@wagmi/core'
import { config as wagmiConfig } from '../../web3/wagmi'
import { poolsAddressesMap } from '../../constants/conceroContracts'

export async function getWithdrawalIdByLpAddress(address: Address): Promise<string | null> {
	try {
		const publicClient = getPublicClient(wagmiConfig, { chainId: base.id })
		return await publicClient.readContract({
			address: poolsAddressesMap[base.id],
			abi: parseAbi(['function s_withdrawalIdByLPAddress(address) view returns (bytes32)']),
			functionName: 's_withdrawalIdByLPAddress',
			args: [address],
		})
	} catch (error) {
		console.error('Failed to get withdrawal id by lp address:', error)
		return null
	}
}
