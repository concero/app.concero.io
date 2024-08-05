import type { SwapState } from '../swapReducer/types'
import { erc20Abi, parseUnits, type PublicClient, type WalletClient } from 'viem'
import { config } from '../../../../constants/config'

export async function checkAllowanceAndApprove(
	swapState: SwapState,
	publicClient: PublicClient,
	walletClient: WalletClient,
) {
	const { from, to } = swapState
	const { token } = from

	const allowance = await publicClient.readContract({
		abi: erc20Abi,
		functionName: 'allowance',
		address: from.token.address,
		args: [from.address, config.PARENT_POOL_CONTRACT],
	})

	const parsedFromAmount = parseUnits(from.amount, token.decimals)

	if (allowance < parsedFromAmount) {
		const approveTx = await walletClient.writeContract({
			abi: erc20Abi,
			functionName: 'approve',
			address: from.token.address,
			args: [config.PARENT_POOL_CONTRACT, parsedFromAmount],
			gas: 100_000n,
		})

		const { status } = await publicClient.waitForTransactionReceipt({
			hash: approveTx,
		})

		if (status === 'reverted') {
			throw new Error('Approve transaction reverted')
		}
	}
}
