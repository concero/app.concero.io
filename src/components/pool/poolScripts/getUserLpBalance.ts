import { type Address, erc20Abi, formatUnits, getContract } from 'viem'
import { config, IS_TESTNET } from '../../../constants/config'
import { getPublicClient } from '@wagmi/core'
import { base, baseSepolia } from 'wagmi/chains'
import { config as wagmiConfig } from '../../../web3/wagmi'

const chainId = IS_TESTNET ? baseSepolia.id : base.id
const publicClient = getPublicClient(wagmiConfig, { chainId })
const lpTokenDecimals = 18

export const getUserLpBalance = async (address: Address) => {
	const tokenFromContract = getContract({
		address: config.LPTOKEN,
		abi: erc20Abi,
		client: publicClient,
	})

	const balance = await tokenFromContract.read.balanceOf([address])
	if (!balance) return 0

	return Number(formatUnits(balance, lpTokenDecimals))
}
