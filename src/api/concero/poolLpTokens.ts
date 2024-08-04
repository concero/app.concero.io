import { type Address, createPublicClient, http, erc20Abi, formatUnits } from 'viem'
import { base } from 'viem/chains'
import { config } from '../../constants/config'
import { getChildPoolsBalance } from './getPoolLiquidity'
import { abi as ParentPool } from '../../abi/ParentPool.json'

const client = createPublicClient({
	chain: base,
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

export const calculateLpAmount = async (amountToDeposit: bigint) => {
	const childPoolsBalance = await getChildPoolsBalance()

	return await client.readContract({
		address: config.PARENT_POOL_CONTRACT,
		abi: ParentPool,
		functionName: 'calculateLpAmount',
		args: [childPoolsBalance, amountToDeposit],
	})
}

export const calculateWithdrawableAmount = async (clpAmount: bigint) => {
	const childPoolsBalance = await getChildPoolsBalance()

	return await client.readContract({
		address: config.PARENT_POOL_CONTRACT,
		abi: ParentPool,
		functionName: 'calculateWithdrawableAmount',
		args: [childPoolsBalance, clpAmount],
	})
}
