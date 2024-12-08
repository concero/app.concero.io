import { type Address, erc20Abi, formatUnits } from 'viem'
import { base } from 'viem/chains'
import { config, IS_TESTNET } from '../../../constants/config'
import { getPoolLiquidity } from './getPoolLiquidity'
import { abi as ParentPool } from '../../../constants/abi/ParentPool.json'
import { getPublicClient } from '@wagmi/core'
import { config as wagmiConfig } from '../../../utils/web3/wagmi'
import { baseSepolia } from 'wagmi/chains'

const client = getPublicClient(wagmiConfig, { chainId: IS_TESTNET ? baseSepolia.id : base.id })
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

export const calculateLpAmount = async (amountToDeposit: bigint): Promise<bigint> => {
	const childPoolsBalance = await getPoolLiquidity(true)

	return (await client.readContract({
		address: config.PARENT_POOL_CONTRACT,
		abi: ParentPool,
		functionName: 'calculateLpAmount',
		args: [childPoolsBalance, amountToDeposit],
	})) as bigint
}

export const calculateWithdrawableAmount = async (clpAmount: bigint): Promise<bigint> => {
	const childPoolsBalance = await getPoolLiquidity(true)

	return (await client.readContract({
		address: config.PARENT_POOL_CONTRACT,
		abi: ParentPool,
		functionName: 'calculateWithdrawableAmount',
		args: [childPoolsBalance, clpAmount],
	})) as bigint
}
