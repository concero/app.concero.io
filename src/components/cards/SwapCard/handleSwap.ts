import { executeRoute } from '../../../api/lifi/fetchLifiRoutes'
import { viemSigner } from '../../../web3/ethers'
import { handleTransactionError } from './handleTransactionError'

export const handleSwap = async (swapDispatch, originalRoutes, switchChainHook) => {
  swapDispatch({
    type: 'SET_LOADING',
    payload: true,
  })
  try {
    const executedRoute = await executeRoute(viemSigner, originalRoutes[0], { switchChainHook })
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
