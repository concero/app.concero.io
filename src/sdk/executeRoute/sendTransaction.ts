import type { InputRouteData, SwapArgs, TxName } from '../types/contractInputTypes'
import type { Address, PublicClient, WalletClient } from 'viem'
import ConceroJson from '../assets/contractsData/Concero.json'

export const sendTransaction = async (
	txArgs: InputRouteData,
	publicClient: PublicClient,
	walletClient: WalletClient,
	conceroAddress: Address,
	clientAddress: Address,
) => {
	const { srcSwapData, bridgeData, dstSwapData } = txArgs

	let txName: TxName = 'swap'
	let args: SwapArgs = [srcSwapData]

	if (srcSwapData.length > 0 && bridgeData) {
		txName = 'swapAndBridge'
		args = [bridgeData, srcSwapData, dstSwapData]
	}
	if (srcSwapData.length === 0 && bridgeData) {
		txName = 'bridge'
		args = [bridgeData, dstSwapData]
	}

	// const { request } = await publicClient.simulateContract({
	// 	account: clientAddress,
	// 	abi: ConceroJson.abi,
	// 	functionName: txName,
	// 	address: conceroAddress,
	// 	args,
	// })
	//
	// const approveTxHash = await walletClient.writeContract(request)

	const approveTxHash = await walletClient.writeContract({
		account: clientAddress,
		abi: ConceroJson.abi,
		functionName: txName,
		address: conceroAddress,
		args,
		gas: 4_000_000n,
	})
}
