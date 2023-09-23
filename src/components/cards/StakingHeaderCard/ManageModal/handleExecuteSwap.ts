import { Dispatch } from 'react'
import { ManageState } from './useManageReducer/types'
import { Status } from './constants'
import { getSigner } from '../../../../web3/getSigner'

function handleError(error: Error, manageDispatch: Dispatch<any>) {
  if (error.message.includes('INSUFFICIENT_GAS_TOKENS')) {
    manageDispatch({ type: 'SET_STATUS', payload: Status.balanceError })
  } else if (error.message.toLowerCase().includes('user rejected')) {
    manageDispatch({ type: 'SET_STATUS', payload: Status.canceled })
  } else {
    manageDispatch({ type: 'SET_STATUS', payload: Status.unknownError })
  }
}

export async function handleExecuteSwap(manageState: ManageState, manageDispatch: Dispatch<any>, switchNetworkAsync: any) {
  manageDispatch({ type: 'SET_LOADING', payload: true })
  manageDispatch({ type: 'SET_STATUS', payload: Status.loading })

  try {
    const { from, route } = manageState
    const { data, to, value } = manageState.route

    console.log('data', data)
    console.log('to', to)

    const signer = await getSigner(from.chain.id, switchNetworkAsync)
    console.log('signer', signer)
    const approveTx = await signer.sendTransaction({ data, to, value })
    console.log(`Approve transaction sent: ${approveTx}`)
    const res = await approveTx.wait()
    console.log(res)
    manageDispatch({ type: 'SET_STATUS', payload: Status.success })
  } catch (error) {
    console.log(error)
    handleError(error, manageDispatch)
  } finally {
    manageDispatch({ type: 'SET_LOADING', payload: false })
  }
}
