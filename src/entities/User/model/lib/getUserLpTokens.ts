import { config } from '@/constants/config'
import { lpTokenBase, parentPoolBase } from '@/constants/poolMainnetAddresses'
import { lpTokenBaseSepolia, parentPoolBaseSepolia } from '@/constants/poolTestnetAddresses'
import { getPublicClient } from '@/shared/api/wagmi'
import { Address, erc20Abi, formatUnits } from 'viem'
import { base, baseSepolia } from 'viem/chains'

const chainId = config.IS_TESTNET ? baseSepolia.id : base.id
const lpAddress = config.IS_TESTNET ? lpTokenBaseSepolia : lpTokenBase
const parentPool = config.IS_TESTNET ? parentPoolBaseSepolia : parentPoolBase
const client = getPublicClient(chainId)
const lpTokenDecimals = 18

export const getUserLpTokens = async (userAddress: Address): Promise<number> => {
	const lpTokens = await client.readContract({
		address: lpAddress,
		abi: erc20Abi,
		functionName: 'balanceOf',
		args: [userAddress],
	})

	return Number(formatUnits(lpTokens, lpTokenDecimals))
}
