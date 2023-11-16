import { providers } from 'ethers'
import { Dispatch } from 'react'
import { SwapAction, SwapCardStage, SwapState } from '../swapReducer/types'
import { fetchOkxTx } from '../../../../api/okx/fetchOkxTx'
import { IFetchOkxTransactionStatus, OKXRoute, OkxTx } from '../../../../api/okx/types'
import { fetchOkxTransactionStatus } from '../../../../api/okx/fetchOkxTransactionStatus'
import BigNumber from 'bignumber.js'

async function checkOkxTransactionStatus(hash: string): Promise<IFetchOkxTransactionStatus> {
	let statusResponse = await fetchOkxTransactionStatus(hash as string)
	console.log(statusResponse)
	let status = statusResponse.detailStatus
	while (status !== 'SUCCESS' && status !== 'FAILURE') {
		statusResponse = await fetchOkxTransactionStatus(hash as string)
		console.log(statusResponse)
		status = statusResponse.detailStatus
		// updateOkxTransactionStatue(status, swapDispatch)
		await new Promise(resolve => setTimeout(resolve, 3000))
	}
	console.log(statusResponse)
	return statusResponse
}

async function sendOkxTransaction(tx: OkxTx, signer: providers.JsonRpcSigner, walletAddress: string): Promise<IFetchOkxTransactionStatus> {
	const transactionTx = await signer.sendTransaction({
		to: tx.to,
		from: walletAddress,
		value: tx.value,
		data: tx.data,
		gasLimit: new BigNumber(tx.gasLimit).times(1.6).toFixed(0).toString(),
		gasPrice: tx.gasLimit,
	})
	return await checkOkxTransactionStatus(transactionTx.hash as string)
}

export async function executeOkxRoute(signer: providers.JsonRpcSigner, swapDispatch: Dispatch<SwapAction>, swapState: SwapState): Promise<void> {
	const { selectedRoute, from, settings } = swapState
	const walletAddress = from.address
	let okxTransactionTx = await fetchOkxTx(selectedRoute?.originalRoute as OKXRoute, walletAddress, settings.slippage_percent, from.amount)
	console.log(okxTransactionTx)

	const isApproveNeeded = !!selectedRoute?.originalRoute?.routerList[0].needApprove ?? false
	console.log('isApproveNeeded', isApproveNeeded)

	// if (isApproveNeeded) {
	// 	await sendOkxTransaction(okxTransactionTx[0].tx, signer, walletAddress)
	// 	okxTransactionTx = await fetchOkxTx(selectedRoute?.originalRoute as OKXRoute, walletAddress, settings.slippage_percent, from.amount)
	// 	console.log(okxTransactionTx)
	// }

	const transactionStatus = await sendOkxTransaction(okxTransactionTx[0].tx, signer, walletAddress)
	console.log(transactionStatus)

	if (transactionStatus.detailStatus === 'SUCCESS') {
		swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.success })
	} else {
		swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.failed })
	}
}

// "[ethjs-rpc] rpc error with payload {"id":3900065658211,"jsonrpc":"2.0","params":["0x02f904d182a4b1148304a9d58304a9d58307762294fc99f58a8974a4bc36e60e2d490bb8d72899ee9f80b904643d21e25a0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000561877b6b3dd7651313794e5f2894b2f18be0766000000000000000000000000fd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb900000000000000000000000070e73f067a1fc9fe6d53151bd271715811746d3a000000000000000000000000000000000000000000000000000000000000000316eb6162e7030c0000000000000000000000000000000000000000000000008900000000000000000000000000000000000000000000000006f05b59d3b2000000000000000000000000000000000000000000000000000000000000000690730000000000000000000000000000000000000000000000000000000000069073000000000000000000000000000000000000000000000000000000000000016000000000000000000000000000000000000000000000000000000000000002a000000000000000000000000000000000000000000000000000000000000003a000000000000000000000000000000000000000000000000000000000000001200000000000000000000000008f957ed3f969d7b6e5d6df81e61a5ff45f594dd1000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000005d905000000000000000000000000000000000000000000000000000000000000000b55534454284d4154494329000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002a3078373045373366303637613166433946453644353331353162643237313731353831313734366433610000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c4d8837daf0000000016eb6162e7030c0070e73f067a1fc9fe6d53151bd271715811746d3a00000000000000000000000000000000000000000000000006f05b59d3b20000000000000000000000000000000000000000000000000000000000000006907300000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000001000000000000000000000000866fb632f2f7c151aa634029a3829a24f49518540000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000002a30783730453733663036376131664339464536443533313531626432373137313538313137343664336100000000000000000000000000000000000000000000c001a0895756e366de5f12bce57f68fb8d114e706823e1edafea36c53be712a2d4bdb2a0105282ac7b32fd69edbf4d8895b550e182794e6bfebd90a78818113c895fe2e1"],"method":"eth_sendRawTransaction"} {
// "code": -32603,
// 	"message": "Internal JSON-RPC error.",
// 	"data": {
// 	"code": -32000,
// 		"message": "max fee per gas less than block base fee: address 0x70E73f067a1fC9FE6D53151bd271715811746d3a, maxFeePerGas: 305621 baseFee: 100000000"
// },
// "stack": "{\n  \"code\": -32603,\n  \"message\": \"Internal JSON-RPC error.\",\n  \"data\": {\n    \"code\": -32000,\n    \"message\": \"max fee per gas less than block base fee: address 0x70E73f067a1fC9FE6D53151bd271715811746d3a, maxFeePerGas: 305621 baseFee: 100000000\"\n  },\n  \"stack\": \"Error: Internal JSON-RPC error.\\n    at i (chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/common-3.js:16:10940)\\n    at s (chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/common-3.js:16:13880)\\n    at Object.internal (chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/common-3.js:16:14490)\\n    at u (chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/background-0.js:7:49968)\\n    at chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/background-0.js:7:50970\\n    at async chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/common-4.js:19:37935\"\n}\n  at i (chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/common-3.js:16:10940)\n  at s (chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/common-3.js:16:13880)\n  at Object.internal (chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/common-3.js:16:14490)\n  at u (chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/background-0.js:7:49968)\n  at chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/background-0.js:7:50970\n  at async chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/common-4.js:19:37935"
// }"
