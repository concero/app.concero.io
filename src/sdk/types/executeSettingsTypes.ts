import { type WalletClient } from 'viem'

export type SwitchChainHook = (chainId: number) => Promise<WalletClient | undefined | void>

export enum ExecuteRouteStage {
	setChain = 'SET_CHAIN',
	setAddress = 'SET_ADDRESS',
	checkAllowance = 'CHECK_ALLOWANCE',
	pendingTransaction = 'PENGING_TRANSACTION',
	failedTransaction = 'FAILED_TRANSACTION',
	successTransaction = 'SUCCESS_TRANSACTION',
	internalError = 'INTERNAL_ERROR',
}

type Status = 'idle' | 'await' | 'success' | 'failed'

export interface ExecutionState {
	stage: ExecuteRouteStage
	payload: {
		title: string
		body: string
		status: Status
		txLink: null
	}
}

export type UpdateRouteHook = (executionState: any) => void

export interface ExecutionConfigs {
	switchChainHook?: SwitchChainHook
	executionStateUpdateHook?: UpdateRouteHook
	executeInBackground?: boolean
	infiniteApproval?: boolean
}
