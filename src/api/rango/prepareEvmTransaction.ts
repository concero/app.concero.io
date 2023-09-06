import { TransactionRequest } from '@ethersproject/abstract-provider/src.ts/index'
import { EvmTransaction, RangoClient, TransactionStatus } from 'rango-sdk-basic'
import { addingTokenDecimals } from '../../utils/formatting'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export function prepareEvmTransaction(evmTx: EvmTransaction, isApprove: boolean): TransactionRequest {
  const gasPrice = !!evmTx.gasPrice && !evmTx.gasPrice.startsWith('0x') ? `0x${parseInt(evmTx.gasPrice).toString(16)}` : null

  const manipulatedTx = {
    ...evmTx,
    gasPrice,
  }

  let tx = {}
  if (manipulatedTx.from) tx = { ...tx, from: manipulatedTx.from }
  if (isApprove) {
    if (manipulatedTx.approveTo) tx = { ...tx, to: manipulatedTx.approveTo }
    if (manipulatedTx.approveData) tx = { ...tx, data: manipulatedTx.approveData }
  } else {
    if (manipulatedTx.txTo) tx = { ...tx, to: manipulatedTx.txTo }
    if (manipulatedTx.txData) tx = { ...tx, data: manipulatedTx.txData }
    if (manipulatedTx.value) tx = { ...tx, value: manipulatedTx.value }
    if (manipulatedTx.gasLimit) tx = { ...tx, gasLimit: manipulatedTx.gasLimit }
    if (manipulatedTx.gasPrice) tx = { ...tx, gasPrice: manipulatedTx.gasPrice }
  }
  return tx
}

export async function checkApprovalSync(requestId: string, txId: string, rangoClient: RangoClient) {
  while (true) {
    const approvalResponse = await rangoClient.isApproved(requestId, txId)
    if (approvalResponse.isApproved) return true
    await sleep(3000)
  }
}

// uses interval to send each object in test_rango_replies to handleRangoResponse
export const dispatchTransactionStatus = (txStatus, swapDispatch) => {
  const txLink = txStatus.explorerUrl[0]?.url ?? null

  const { status, bridgeData, output } = txStatus
  // const { srcChainId, destChainId, srcTokenAmt, destTokenAmt } = bridgeData

  // let extraInfo = ''
  // if (srcTokenAmt && destTokenAmt && tokens[srcChainId] && tokens[destChainId]) {
  //   extraInfo = `Swapping ${parseFloat(srcTokenAmt) / 10 ** 18} ${tokens[srcChainId][]} to ${parseFloat(destTokenAmt) / 10 ** 18} ${tokens[destChainId]}.`
  // }

  switch (status) {
    case TransactionStatus.FAILED: {
      swapDispatch({
        type: 'APPEND_SWAP_STEP',
        payload: {
          status: 'error',
          title: 'Transaction failed',
          body: 'Please look up the transaction in the explorer to find out the details.',
          txLink,
        },
      })
      swapDispatch({ type: 'SET_SWAP_STAGE', payload: 'failed' })
      break
    }
    case TransactionStatus.SUCCESS: {
      let body = 'Your transaction was successful.'
      if (bridgeData.destTokenAmt && bridgeData.destTokenDecimals && output.receivedToken.symbol) {
        body = `${addingTokenDecimals(bridgeData.destTokenAmt, bridgeData.destTokenDecimals)} ${output.receivedToken.symbol} were added to your wallet.`
      }

      swapDispatch({
        type: 'APPEND_SWAP_STEP',
        payload: { status: 'success', title: 'Swap completed', body, txLink },
      })
      swapDispatch({ type: 'SET_SWAP_STAGE', payload: 'success' })
      break
    }
    case TransactionStatus.RUNNING: {
      const body = 'Please wait, this may take up to 20 minutes.'
      // if (extraInfo) body += ` ${extraInfo}`
      swapDispatch({
        type: 'UPSERT_SWAP_STEP',
        payload: { status: 'pending', title: 'Transaction pending', body, txLink },
      })
      break
    }
    default:
      swapDispatch({
        type: 'APPEND_SWAP_STEP',
        payload: { status: 'await', title: 'Transaction in progress', body: 'Please be patient, this may take up to 20 minutes.', txLink },
      })
  }
}

export const checkTransactionStatusSync = async (requestId: string, txId: string, rangoClient: RangoClient, swapDispatch) => {
  while (true) {
    const txStatus = await rangoClient
      .status({
        requestId,
        txId,
      })
      .catch((e) => {
        console.error(e)
      })

    if (txStatus) {
      console.log(txStatus)
      dispatchTransactionStatus(txStatus, swapDispatch)
    }
    if (!!txStatus.status && [TransactionStatus.FAILED, TransactionStatus.SUCCESS].includes(txStatus.status)) {
      return txStatus
    }
    await sleep(3000)
  }
}
