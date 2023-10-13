import { Dispatch } from 'react'
import { ManageAction, ManageState } from './useManageReducer/types'
import { Status } from './constants'
import { getSigner } from '../../../../web3/getSigner'
import { SwitchNetworkArgs, SwitchNetworkResult } from '@wagmi/core'
import { Contract } from 'ethers'
import { JsonRpcSigner } from '@ethersproject/providers/src.ts/json-rpc-provider'
import BigNumber from 'bignumber.js'

function handleError(error: Error, manageDispatch: Dispatch<ManageAction>): void {
	if (error.message.includes('INSUFFICIENT_GAS_TOKENS')) {
		manageDispatch({ type: 'SET_STATUS', payload: Status.balanceError })
	} else if (error.message.toLowerCase().includes('user rejected')) {
		manageDispatch({ type: 'SET_STATUS', payload: Status.canceled })
	} else {
		manageDispatch({ type: 'SET_STATUS', payload: Status.unknownError })
	}
}

type SwitchChainNetwork = (chainId_?: SwitchNetworkArgs['chainId']) => Promise<SwitchNetworkResult>

async function approveToken(signer: JsonRpcSigner, receiverAddress: string, fromTokenAddress: string, fromAmount: string): Promise<void> {
	const erc20 = new Contract(fromTokenAddress, ['function approve(address,uint256)'], signer)
	return (await erc20.approve(receiverAddress, fromAmount)).wait()
}

export async function handleExecuteSwap(manageState: ManageState, manageDispatch: Dispatch<ManageAction>, switchNetworkAsync: SwitchChainNetwork): Promise<void> {
	manageDispatch({ type: 'SET_LOADING', payload: true })
	manageDispatch({ type: 'SET_STATUS', payload: Status.loading })

	if (!manageState.route) return
	const { from } = manageState

	try {
		const signer = await getSigner(Number(from.chain.id), switchNetworkAsync)
		await approveToken(signer, manageState.address, from.token.address, from.amount)

		const transactionArgs = {
			...manageState.route.tx,
			gasLimit: BigNumber(manageState.route.gas).times(1.1).toFixed(0).toString(),
		}

		console.log('transactionArgs: ', transactionArgs)

		await signer.sendTransaction(transactionArgs)
		manageDispatch({ type: 'SET_STATUS', payload: Status.success })
	} catch (error) {
		console.log(error)
		handleError(error as Error, manageDispatch)
	} finally {
		manageDispatch({ type: 'SET_LOADING', payload: false })
	}
}
