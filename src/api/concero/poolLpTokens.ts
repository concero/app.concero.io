import { type Address, createPublicClient, http, erc20Abi, formatUnits } from 'viem'
import { baseSepolia } from 'viem/chains'

const client = createPublicClient({
	chain: baseSepolia,
	transport: http(),
})

const lpTokenDecimals = 18

export const getUserLpTokens = async (userAddress: Address): Promise<number> => {
	const lpTokens = await client.readContract({
		address: '0x832baA9313527960dCf7133385BF433414aFB75a' as Address,
		abi: erc20Abi,
		functionName: 'balanceOf',
		args: [userAddress],
	})

	return Number(formatUnits(lpTokens, lpTokenDecimals))
}

export const getLpTotalSupply = async () => {
	const totalSupply = await client.readContract({
		address: '0x832baA9313527960dCf7133385BF433414aFB75a' as Address,
		abi: erc20Abi,
		functionName: 'totalSupply',
	})

	return Number(formatUnits(totalSupply, lpTokenDecimals))
}
