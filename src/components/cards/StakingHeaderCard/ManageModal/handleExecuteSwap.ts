import { Dispatch } from 'react'
import { ManageAction, ManageState } from './useManageReducer/types'
import { Status } from './constants'
import { getSigner } from '../../../../web3/getSigner'
import { SwitchNetworkArgs, SwitchNetworkResult } from '@wagmi/core'

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
		await signer.sendTransaction(manageState.route.tx)
		manageDispatch({ type: 'SET_STATUS', payload: Status.success })
	} catch (error) {
		console.log(error)
		handleError(error as Error, manageDispatch)
	} finally {
		manageDispatch({ type: 'SET_LOADING', payload: false })
	}
}
