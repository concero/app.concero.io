import { Dispatch } from 'react'
import { createWalletClient, custom } from 'viem'
import { providers } from 'ethers'
import { ManageState } from './useManageReducer/types'
import { Status } from './constants'

async function getSigner(requiredChainId: number, switchNetworkAsync: any) {
  if (switchNetworkAsync) await switchNetworkAsync(requiredChainId)
  const client0 = createWalletClient({
    transport: custom(window.ethereum),
  })

  const provider = new providers.Web3Provider(client0.transport, 'any')
  return provider.getSigner()
}

export async function handleExecuteSwap(manageState: ManageState, manageDispatch: Dispatch<any>, switchNetworkAsync: any) {
  manageDispatch({ type: 'SET_LOADING', payload: true })
  manageDispatch({ type: 'SET_STATUS', payload: Status.loading })

  const { from, route } = manageState
  const amount = route.toTokenAmount

  try {
    // const { data, to } = await approve({
    //   fromChainId: from.chain.id,
    //   toChainId: manageState.to.chain.id,
    //   fromToken: from.token.address,
    //   toToken: manageState.to.token.address,
    //   amount,
    // })

    const { data, to } = manageState.route
    console.log('data', data)
    console.log('to', to)

    const signer = await getSigner(from.chain.id, switchNetworkAsync)
    console.log('signer', signer)
    const approveTx = await signer.sendTransaction({ data, to })
    console.log(`Approve transaction sent: ${approveTx}`)
    const res = await approveTx.wait()
    console.log(res)
    manageDispatch({ type: 'SET_STATUS', payload: Status.success })
  } catch (error) {
    console.log(error)
    manageDispatch({ type: 'SET_STATUS', payload: Status.unknownError })
  } finally {
    manageDispatch({ type: 'SET_LOADING', payload: false })
  }
}
