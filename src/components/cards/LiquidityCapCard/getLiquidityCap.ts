import { formatUnits } from 'viem'
import { abi } from '../../../abi/ParentPool.json'
import { config } from '../../../constants/config'
import { base } from 'wagmi/chains'
import { getPublicClient } from '@wagmi/core'
import { config as wagmiConfig } from '../../../web3/wagmi'

const usdcDecimals = 6

export const getMaxCap = async () => {
	try {
		const client = getPublicClient(wagmiConfig, { chainId: base.id })

		const liquidityCap = await client.readContract({
			address: config.PARENT_POOL_CONTRACT,
			abi,
			functionName: 'getMaxDeposit',
		})

		return Number(formatUnits(BigInt(liquidityCap as number), usdcDecimals))
	} catch (error) {
		console.error(error)
	}
}
