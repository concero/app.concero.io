import { EvmTransaction } from 'rango-sdk-basic'
import { rangoClient } from '../../../../api/rango/rangoClient'
import {
  checkApprovalSync,
  checkTransactionStatusSync,
  prepareEvmTransaction,
} from '../../../../api/rango/prepareEvmTransaction'
import { viemSigner } from '../../../../web3/ethers'
import { addingDecimals } from '../../../../utils/formatting'

const getRangoSwapOptions = (route, address, from, settings) => {
  const amount = addingDecimals(from.amount, from.token.decimals)

  return {
    from: {
      blockchain: route.from.blockchain,
      symbol: route.from.symbol,
      address: route.from.address,
    },
    to: {
      blockchain: route.to.blockchain,
      symbol: route.to.symbol,
      address: route.to.address,
    },
    amount,
    disableEstimate: false,
    slippage: settings.slippage_percent,
    fromAddress: address,
    toAddress: address,
    referrerAddress: null,
    referrerFee: null,
  }
}

export const executeRangoRoute = async (route, address, from, settings) => {
  const swapOptions = getRangoSwapOptions(route, address, from, settings)

  const response = await rangoClient.swap(swapOptions)

  if (!!response.error || response.resultType !== 'OK') {
    const msg = `Error swapping, message: ${response.error}, status: ${response.resultType}`
    throw new Error(msg)
  }

  const evmTransaction = response.tx as EvmTransaction

  if (response.approveTo && response.approveData) {
    const approveTx = prepareEvmTransaction(evmTransaction, true)
    const approveTxHash = (await viemSigner.sendTransaction(approveTx)).hash
    await checkApprovalSync(response.requestId, approveTxHash, rangoClient)
  }

  const mainTx = prepareEvmTransaction(evmTransaction, false)
  const mainTxHash = (await viemSigner.sendTransaction(mainTx)).hash

  return checkTransactionStatusSync(response.requestId, mainTxHash, rangoClient)
}
