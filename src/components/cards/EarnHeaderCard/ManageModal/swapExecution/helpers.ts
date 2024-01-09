import { type Dispatch } from 'react'
import { type ManageAction } from '../useEarnReducer/types'
import { ModalType, Status } from '../constants'
import { Contract } from 'ethers'
import { get } from '../../../../../api/client'
import BigNumber from 'bignumber.js'
import { type JsonRpcSigner } from '@ethersproject/providers/src.ts/json-rpc-provider'

export function handleError(error: Error, manageDispatch: Dispatch<ManageAction>): void {
	manageDispatch({ type: 'SET_MODAL_TYPE', payload: ModalType.failure })
	manageDispatch({ type: 'SET_STATUS', payload: Status.failed })
	if (error.message.includes('INSUFFICIENT_GAS_TOKENS')) {
		manageDispatch({ type: 'PUSH_STEP', step: { title: 'Insufficient balance', status: 'error' } })
	} else if (error.message.toLowerCase().includes('user rejected')) {
		manageDispatch({ type: 'PUSH_STEP', step: { title: 'Cancelled by user', body: 'Transaction was cancelled', status: 'error' } })
	} else {
		manageDispatch({ type: 'PUSH_STEP', step: { title: 'Something went wrong.', status: 'error' } })
	}
}

interface IApproveToken {
	signer: JsonRpcSigner
	tokenAddress: string
	receiverAddress: string
	fromAmount: string
}

export async function approveToken({ signer, tokenAddress, receiverAddress, fromAmount }: IApproveToken): Promise<void> {
	const erc20 = new Contract(tokenAddress, ['function approve(address,uint256)'], signer)
	return (await erc20.approve(receiverAddress, fromAmount)).wait()
}

interface IApproval {
	allowance: string
	spender: string
	token: string
}

export async function checkIsApproveNeeded(fromChainId: number, fromAddress: string, tokenAddress: string, fromAmount: string): Promise<boolean> {
	const url = `https://api.enso.finance/api/v1/wallet/approvals?chainId=${fromChainId}&fromAddress=${fromAddress}`
	const response = await get(url)
	const approval: IApproval | undefined = response.data.find((item: IApproval) => item.token === tokenAddress)
	if (!approval) return true
	return new BigNumber(approval.allowance).isLessThan(fromAmount)
}
