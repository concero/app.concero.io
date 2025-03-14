import { Address } from 'viem'

export type TAcceptTerms = {
	address: Address
}
export type TUserVolumeArgs = {
	address?: string
	startDate: { $numberDecimal: string } | number
	endDate: { $numberDecimal: string } | number
	isCrossChain?: boolean | undefined
	chainIds?: string[]
}
