import { executeRoute } from '../../../api/lifi/fetchLifiRoutes'
import { viemSigner } from '../../../web3/ethers'
import { handleTransactionError } from './handleTransactionError'

export const handleSwap = async (swapDispatch, originalRoute, switchChainHook) => {
  if (!originalRoute) return console.error('No original route passed')
  swapDispatch({
    type: 'SET_LOADING',
    payload: true,
  })
  try {
    const executedRoute = await executeRoute(viemSigner, originalRoute, { switchChainHook })
    console.log('executedRoute', executedRoute)

    if (executedRoute) {
      swapDispatch({
        type: 'SET_RESPONSES',
        payload: {
          provider: 'lifi',
          isOk: true,
          message: 'Success',
        },
      })
    }
  } catch (e) {
    console.log('ERROR: ', e)
    handleTransactionError(e, swapDispatch)
  }
  await swapDispatch({
    type: 'SET_LOADING',
    payload: false,
  })
}
