import { type Address, createPublicClient, http, erc20Abi, formatUnits } from 'viem'
import { baseSepolia } from 'viem/chains'
import { config } from '../../constants/config'

const client = createPublicClient({
	chain: baseSepolia,
	transport: http(),
})

const lpTokenDecimals = 18

export const getUserLpTokens = async (userAddress: Address): Promise<number> => {
	const lpTokens = await client.readContract({
		address: config.LPTOKEN,
		abi: erc20Abi,
		functionName: 'balanceOf',
		args: [userAddress],
	})

	return Number(formatUnits(lpTokens, lpTokenDecimals))
}

export const getLpTotalSupply = async () => {
	const totalSupply = await client.readContract({
		address: config.LPTOKEN,
		abi: erc20Abi,
		functionName: 'totalSupply',
	})

	return Number(formatUnits(totalSupply, lpTokenDecimals))
}
