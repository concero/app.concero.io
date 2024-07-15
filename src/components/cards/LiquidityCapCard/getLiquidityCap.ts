import { type Address, createPublicClient, http, formatUnits } from 'viem'
import { baseSepolia } from 'viem/chains'
import { abi } from '../../../abi/ParentPool.json'
import { config } from '../../../constants/config'

const usdcDecimals = 6

export const getMaxCap = async () => {
	try {
		const client = createPublicClient({
			chain: baseSepolia,
			transport: http(),
		})

		const liquidityCap = await client.readContract({
			address: config.PARENT_POOL_CONTRACT,
			abi,
			functionName: 'getMaxCap',
		})

		return Number(formatUnits(BigInt(liquidityCap as number), usdcDecimals))
	} catch (error) {
		console.error(error)
	}
}
