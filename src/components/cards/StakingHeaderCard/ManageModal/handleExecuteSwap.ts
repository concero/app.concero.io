import { Dispatch } from 'react'
import { ManageAction, ManageState } from './useManageReducer/types'
import { Status } from './constants'
import { getSigner } from '../../../../web3/getSigner'
import { SwitchNetworkArgs, SwitchNetworkResult } from '@wagmi/core'
import { BigNumber } from 'bignumber.js'

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

export async function handleExecuteSwap(manageState: ManageState, manageDispatch: Dispatch<ManageAction>, switchNetworkAsync: SwitchChainNetwork): Promise<void> {
	manageDispatch({ type: 'SET_LOADING', payload: true })
	manageDispatch({ type: 'SET_STATUS', payload: Status.loading })

	if (!manageState.route) return

	try {
		const { from } = manageState
		const signer = await getSigner(Number(from.chain.id), switchNetworkAsync)

		const transactionArgs = {
			...manageState.route.tx,
			gasLimit: BigNumber(manageState.route.gas).times(1.2).toFixed(0).toString(),
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
