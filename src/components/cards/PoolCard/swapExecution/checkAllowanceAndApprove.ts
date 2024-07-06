import type { SwapState } from '../swapReducer/types'
import { type Address, erc20Abi, type PublicClient, type WalletClient } from 'viem'
import { addingAmountDecimals } from '../../../../utils/formatting'
import { parentPoolAddress } from './executeDeposit'

export async function checkAllowanceAndApprove(
	swapState: SwapState,
	srcPublicClient: PublicClient,
	walletClient: WalletClient,
) {
	const allowance = await srcPublicClient.readContract({
		abi: erc20Abi,
		functionName: 'allowance',
		address: swapState.from.token.address as Address,
		args: [swapState.from.address, parentPoolAddress],
	})

	let approveTxHash = null
	const amountInDecimals = BigInt(addingAmountDecimals(swapState.from.amount, swapState.from.token.decimals)!)

	if (allowance < amountInDecimals) {
		const { request } = await srcPublicClient.simulateContract({
			account: swapState.from.address,
			address: swapState.from.token.address as Address,
			abi: erc20Abi,
			functionName: 'approve',
			args: [parentPoolAddress, amountInDecimals],
		})

		approveTxHash = await walletClient.writeContract(request)
	}

	if (approveTxHash) {
		await srcPublicClient.waitForTransactionReceipt({ hash: approveTxHash })
	}
}
