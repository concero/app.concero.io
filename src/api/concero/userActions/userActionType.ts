import { type Hash } from 'viem'

export enum TransactionType {
	ConceroSwapTx = 'ConceroSwapTx',
	ConceroBridgeTx = 'ConceroBridgeTx',
}

export enum ActionType {
	'transactionReward',
	'questReward',
}

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

export interface UserActionQuestData {
	name: string
	points?: number
	multiplier?: number
	timestamp: number
	completedQuestStepIds?: number[]
	isCompleted?: boolean
}

export interface IUserAction {
	userAddress: string
	documentId: string
	actionType: ActionType
	points?: number
	multiplier?: number
	timestamp: number
	data: UserActionTxData | UserActionQuestData
}
