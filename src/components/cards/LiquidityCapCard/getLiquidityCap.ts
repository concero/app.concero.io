import { formatUnits } from 'viem'
import { abi } from '../../../constants/abi/ParentPool.json'
import { config, IS_TESTNET } from '../../../constants/config'
import { base, baseSepolia } from 'wagmi/chains'
import { getPublicClient } from '@wagmi/core'
import { config as wagmiConfig } from '../../../utils/web3/wagmi'

const usdcDecimals = 6

export const getMaxCap = async () => {
	try {
		const client = getPublicClient(wagmiConfig, { chainId: IS_TESTNET ? baseSepolia.id : base.id })

		const liquidityCap = await client.readContract({
			address: config.PARENT_POOL_CONTRACT,
			abi,
			functionName: 'getLiquidityCap',
		})

		return Number(formatUnits(BigInt(liquidityCap as number), usdcDecimals))
	} catch (error) {
		console.error(error)
	}
}
