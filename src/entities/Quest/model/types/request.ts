import { Address } from 'viem'

export type TVerifyArgs = {
	questId: string
	stepId: string
	address: Address
}
export type TClaimArgs = {
	questId: string
	address: Address
}
