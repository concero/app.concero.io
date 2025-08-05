import { Address } from 'viem'

export type TUserVolumeArgs = {
	address?: string
	startDate: { $numberDecimal: string } | number
	endDate: { $numberDecimal: string } | number
	isCrossChain?: boolean | undefined
	chainIds?: number[]
}

export type TUpdateNicknameArgs = {
	address: Address
	newNickname: string
}
