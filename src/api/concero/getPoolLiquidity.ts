import { erc20Abi, formatUnits } from 'viem'
import { type IPoolConfig, poolConfigs, poolLoansInUseAbiITem, usdcDecimals } from './poolConfigs'
import { getPublicClient } from '@wagmi/core'
import { config } from '../../web3/wagmi'

export const getLiquidityOnChain = async (poolConfig: IPoolConfig) => {
	const { chain, conceroContract, usdcContract } = poolConfig

	const client = getPublicClient(config, { chainId: chain.id })

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

export const getPoolLiquidity = async (childrenOnly = false) => {
	let totalLiquidity = 0

	const formattedPoolConfigs = poolConfigs.filter(poolConfig => (childrenOnly ? !poolConfig.isParent : true))

	for (const poolConfig of formattedPoolConfigs) {
		const totalOnChain = await getLiquidityOnChain(poolConfig)
		totalLiquidity += totalOnChain
	}

	if (childrenOnly) {
		return BigInt(totalLiquidity)
	}

	console.log(totalLiquidity, formatUnits(BigInt(totalLiquidity), usdcDecimals))
	return Number(formatUnits(BigInt(totalLiquidity), usdcDecimals))
}
