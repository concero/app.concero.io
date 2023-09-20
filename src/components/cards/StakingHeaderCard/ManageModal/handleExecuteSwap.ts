import { Dispatch } from 'react'
import { approve } from 'wido'
import { createWalletClient, custom } from 'viem'
import { providers } from 'ethers'
import { ManageState } from './useManageReducer/types'

async function getSigner(requiredChainId: number, switchNetworkAsync: any) {
  await switchNetworkAsync(requiredChainId)
  const client0 = createWalletClient({
    transport: custom(window.ethereum),
  })

  const provider = new providers.Web3Provider(client0.transport, 'any')
  return provider.getSigner()
}

export async function handleExecuteSwap(manageState: ManageState, manageDispatch: Dispatch<any>, switchNetworkAsync: any) {
  manageDispatch({ type: 'SET_LOADING', payload: true })
  const { from, route } = manageState
  const amount = route.toTokenAmount

  try {
    const { data, to } = await approve({
      fromChainId: from.chain.id,
      toChainId: manageState.to.chain.id,
      fromToken: from.token.address,
      toToken: manageState.to.token.address,
      amount,
    })
    const signer = await getSigner(from.chain.id, switchNetworkAsync)
    console.log('approved', data, to)
    const approveTx = await signer.sendTransaction({ data, to })
    console.log(`Approve transaction sent: ${approveTx}`)
    const res = await approveTx.wait()
    console.log(res)
  } catch (error) {
    console.error(error)
  } finally {
    manageDispatch({ type: 'SET_LOADING', payload: false })
  }
}
