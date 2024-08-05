import { arbitrum, avalanche, base, polygon } from 'viem/chains'
import type { Address, Chain } from 'viem'

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
		conceroContract: '0x0AE1B2730066AD46481ab0a5fd2B5893f8aBa323',
		usdcContract: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
	},
	{
		isParent: false,
		chain: arbitrum,
		conceroContract: '0x164c20A4E11cBE0d8B5e23F5EE35675890BE280d',
		usdcContract: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
	},
	{
		isParent: false,
		chain: polygon,
		conceroContract: '0x164c20A4E11cBE0d8B5e23F5EE35675890BE280d',
		usdcContract: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
	},
	{
		isParent: false,
		chain: avalanche,
		conceroContract: '0x164c20A4E11cBE0d8B5e23F5EE35675890BE280d',
		usdcContract: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
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
