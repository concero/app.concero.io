import { type Hash } from 'viem'
/**@deprecated */
export enum TransactionType {
	ConceroSwapTx = 'ConceroSwapTx',
	ConceroBridgeTx = 'ConceroBridgeTx',
}
/**@deprecated */
export enum ActionType {
	'transactionReward',
	'questReward',
	'specialReward',
}
/**@deprecated */
export interface UserActionTxData {
	type: TransactionType
	from: {
		chainName: string
		tokenSymbol: string
		amount: number
	}
	to: {
		chainName: string
		tokenSymbol: string
		amount: number
	}
	txHash: Hash
}
/**@deprecated */
export interface UserActionQuestData {
	name: string
	points?: number
	multiplier?: number
	timestamp: number
	completedQuestStepIds?: number[]
	isCompleted?: boolean
}
/**@deprecated */
export interface IUserAction {
	userAddress: string
	documentId: string
	actionType: ActionType
	points?: number
	multiplier?: number
	timestamp: number
	data: UserActionTxData | UserActionQuestData
}
