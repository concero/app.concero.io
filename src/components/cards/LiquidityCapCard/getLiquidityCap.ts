import { createPublicClient, http, formatUnits } from 'viem'
import { abi } from '../../../abi/ParentPool.json'
import { config } from '../../../constants/config'
import { base } from 'wagmi/chains'

const usdcDecimals = 6

export const getMaxCap = async () => {
	try {
		const client = createPublicClient({
			chain: base,
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
