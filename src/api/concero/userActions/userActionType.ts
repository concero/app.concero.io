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
}

export interface IUserActionPopulated {
	actionType: ActionType
	points?: number
	multiplier?: number
	timestamp: number
	data: UserActionTxData | UserActionQuestData
}
