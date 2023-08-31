import { TransactionRequest } from '@ethersproject/abstract-provider/src.ts/index'
import { EvmTransaction, TransactionStatus } from 'rango-sdk-basic'
import { post } from '../client'

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function prepareEvmTransaction(evmTx: EvmTransaction, isApprove: boolean): TransactionRequest {
  const gasPrice =
    !!evmTx.gasPrice && !evmTx.gasPrice.startsWith('0x') ? '0x' + parseInt(evmTx.gasPrice).toString(16) : null

  const manipulatedTx = {
    ...evmTx,
    gasPrice,
  }

  let tx = {}
  if (!!manipulatedTx.from) tx = { ...tx, from: manipulatedTx.from }
  if (isApprove) {
    if (!!manipulatedTx.approveTo) tx = { ...tx, to: manipulatedTx.approveTo }
    if (!!manipulatedTx.approveData) tx = { ...tx, data: manipulatedTx.approveData }
  } else {
    if (!!manipulatedTx.txTo) tx = { ...tx, to: manipulatedTx.txTo }
    if (!!manipulatedTx.txData) tx = { ...tx, data: manipulatedTx.txData }
    if (!!manipulatedTx.value) tx = { ...tx, value: manipulatedTx.value }
    if (!!manipulatedTx.gasLimit) tx = { ...tx, gasLimit: manipulatedTx.gasLimit }
    if (!!manipulatedTx.gasPrice) tx = { ...tx, gasPrice: manipulatedTx.gasPrice }
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

export const checkTransactionStatusSync = async (requestId: string, txId: string, rangoClient: RangoClient) => {
  console.log('INIT DATA: ', 'rqID: ', requestId, 'txID: ', txId)

  while (true) {
    const txStatus = await rangoClient
      .status({
        requestId,
        txId,
      })
      .catch((e) => {
        console.error(e)
      })

    console.log('txStatus: ')
    console.log(JSON.stringify(txStatus))

    const response1 = await post(
      'https://api.rango.exchange/tx/check-status?apiKey=b6867e4d-d65c-4cd9-8532-59b6fc1f2c00',
      {
        requestId,
        txId,
        step: '1',
      },
    )

    console.log('stepStatus_1: ')
    console.log(JSON.stringify(response1))

    const response2 = await post(
      'https://api.rango.exchange/tx/check-status?apiKey=b6867e4d-d65c-4cd9-8532-59b6fc1f2c00',
      {
        requestId,
        txId,
        step: '2',
      },
    )

    if (response2.status === 200) {
      console.log('stepStatus_2: ')
      console.log(JSON.stringify(response2))
    }

    if (!!txStatus) {
      if (!!txStatus.status && [TransactionStatus.FAILED, TransactionStatus.SUCCESS].includes(txStatus.status)) {
        return txStatus
      }
    }
    await sleep(3000)
  }
}
