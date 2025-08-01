import { Address } from 'viem'

export type TVerifyArgs = {
	user_step_id: string
	address: Address
}
export type TClaimArgs = {
	questId: string
	address: Address
}
