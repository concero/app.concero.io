import { type Address, createPublicClient, http } from 'viem'
import { baseSepolia } from 'viem/chains'
import { config } from '../../../constants/config'
import { abi } from '../../../abi/ParentPool.json'

export const getLiquidityCap = async () => {
	try {
		const client = createPublicClient({
			chain: baseSepolia,
			transport: http(),
		})

		const liquidityCap = await client.readContract({
			address: config.PARENT_POOL_CONTRACT as Address,
			abi,
			functionName: 'getMaxCap',
		})

		return liquidityCap
	} catch (error) {
		console.error(error)
	}
}
