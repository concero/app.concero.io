import { createPublicClient, http, erc20Abi, formatUnits } from 'viem'
import { type IPoolConfig, poolConfigs, poolLoansInUseAbiITem, usdcDecimals } from './poolConfigs'

export const getLiquidityOnChain = async (poolConfig: IPoolConfig) => {
	const { chain, conceroContract, usdcContract } = poolConfig

	const client = createPublicClient({
		chain,
		transport: http(),
	})

	const results = await client.multicall({
		contracts: [
			{
				address: conceroContract,
				abi: poolLoansInUseAbiITem,
				functionName: 's_loansInUse',
			},
			{
				address: usdcContract,
				abi: erc20Abi,
				functionName: 'balanceOf',
				args: [conceroContract],
			},
		],
	})

	return results.reduce((acc, item) => {
		const balance = item.status === 'success' ? Number(item.result) : 0
		return balance + acc
	}, 0)
}

export const getPoolLiquidity = async () => {
	let totalLiquidity = 0

	for (const poolConfig of poolConfigs) {
		const totalOnChain = await getLiquidityOnChain(poolConfig)
		totalLiquidity += totalOnChain
	}

	return Number(formatUnits(BigInt(totalLiquidity), usdcDecimals))
}

export const getChildPoolsBalance = async () => {
	let totalLiquidity = 0

	const chlidPools = poolConfigs.filter(poolConfig => !poolConfig.isParent)

	for (const poolConfig of chlidPools) {
		const totalOnChain = await getLiquidityOnChain(poolConfig)
		totalLiquidity += totalOnChain
	}

	return BigInt(totalLiquidity)
}
