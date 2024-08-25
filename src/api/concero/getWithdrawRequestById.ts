import { config } from '../../constants/config'
import { base } from 'wagmi/chains'
import { getPublicClient } from '@wagmi/core'
import { config as wagmiConfig } from '../../web3/wagmi'
import { abi } from '../../abi/ParentPool.json'

export async function getWithdrawRequestById(withdrawRequestId: string): Promise<string | null> {
	try {
		const publicClient = getPublicClient(wagmiConfig, { chainId: base.id })
		return await publicClient.readContract({
			address: config.PARENT_POOL_CONTRACT,
			abi,
			functionName: 'getWithdrawalRequestById',
			args: [withdrawRequestId],
		})
	} catch (error) {
		console.error('Failed to get withdrawal id by lp address:', error)
		return null
	}
}
