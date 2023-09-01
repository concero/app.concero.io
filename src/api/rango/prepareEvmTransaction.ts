import { TransactionRequest } from '@ethersproject/abstract-provider/src.ts/index'
import { EvmTransaction, RangoClient, TransactionStatus } from 'rango-sdk-basic'

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
    if (approvalResponse.isApproved) {
      return true
    }
    await sleep(3000)
  }
}

const dispatchTransactionStatus = (txStatus, swapDispatch) => {
  switch (txStatus.status) {
    case TransactionStatus.FAILED:
      swapDispatch({
        type: 'SET_SWAP_PROGRESS',
        payload: [{ status: 'error', title: 'Transaction failed', body: `Tx Hash: ${txStatus.bridgeData.srcTxHash}` }],
      })
    case TransactionStatus.SUCCESS:
      swapDispatch({
        type: 'SET_SWAP_PROGRESS',
        payload: [
          { status: 'success', title: 'Transaction success', body: `Tx Hash: ${txStatus.bridgeData.srcTxHash}` },
        ],
      })
    case TransactionStatus.RUNNING:
      swapDispatch({
        type: 'SET_SWAP_PROGRESS',
        payload: [
          {
            status: 'pending',
            title: 'Transaction pending',
            body: `Please be patient, this may take up to 20 minutes. Tx Hash: ${txStatus.bridgeData.srcTxHash}`,
          },
        ],
      })
    default:
      swapDispatch({
        type: 'SET_SWAP_PROGRESS',
        payload: [
          {
            status: 'await',
            title: 'Executing transaction',
            body: `Please be patient, this may take up to 20 minutes. Tx Hash: ${txStatus.bridgeData.srcTxHash}`,
          },
        ],
      })
  }
}

export const checkTransactionStatusSync = async (
  requestId: string,
  txId: string,
  rangoClient: RangoClient,
  swapDispatch,
) => {
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
