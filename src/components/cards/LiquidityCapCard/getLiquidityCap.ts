import { type Address, createPublicClient, http, formatUnits } from 'viem'
import { baseSepolia } from 'viem/chains'
import { abi } from '../../../abi/ParentPool.json'

const usdcDecimals = 6

export const getMaxCap = async () => {
	try {
		const client = createPublicClient({
			chain: baseSepolia,
			transport: http(),
		})

		const liquidityCap = await client.readContract({
			address: '0x3997e8Fc5C47AFE6B298E8eB7d030e96Eb7c4b0d' as Address,
			abi,
			functionName: 'getMaxCap',
		})

		return Number(formatUnits(BigInt(liquidityCap as number), usdcDecimals))
	} catch (error) {
		console.error(error)
	}
}
