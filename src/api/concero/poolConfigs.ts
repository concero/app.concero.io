import { arbitrum, avalanche, base, polygon } from 'viem/chains'
import type { Address, Chain } from 'viem'
import { config } from '../../constants/config'
import { optimism } from '@reown/appkit/networks'

export interface IPoolConfig {
	isParent: boolean
	chain: Chain
	conceroContract: Address
	usdcContract: Address
}

export const usdcDecimals = 6

export const poolConfigs: IPoolConfig[] = [
	{
		isParent: true,
		chain: base,
		conceroContract: config.PARENT_POOL_CONTRACT,
		usdcContract: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
	},
	{
		isParent: false,
		chain: arbitrum,
		conceroContract: config.CHILD_POOL_ARBITRUM,
		usdcContract: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
	},
	{
		isParent: false,
		chain: polygon,
		conceroContract: config.CHILD_POOL_POLYGON,
		usdcContract: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
	},
	{
		isParent: false,
		chain: avalanche,
		conceroContract: config.CHILD_POOL_AVALANCHE,
		usdcContract: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
	},
	{
		isParent: false,
		chain: optimism,
		conceroContract: config.CHILD_POOL_OPTIMISM,
		usdcContract: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',
	},
]

export const poolLoansInUseAbiITem = [
	{
		type: 'function',
		name: 's_loansInUse',
		inputs: [],
		outputs: [{ name: 's_loansInUse', type: 'uint256', internalType: 'uint256' }],
		stateMutability: 'view',
	},
]
