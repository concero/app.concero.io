import { StageType, type SwapAction, type SwapState } from '../swapReducer/types'
import { type Address, erc20Abi, parseUnits, type PublicClient, type WalletClient } from 'viem'
import { config } from '../../../../constants/config'
import { type Dispatch } from 'react'

export async function checkAllowanceAndApprove(
	swapState: SwapState,
	swapDispatch: Dispatch<SwapAction>,
	publicClient: PublicClient,
	walletClient: WalletClient,
) {
	const { from } = swapState
	const { token } = from

	const allowance = await publicClient.readContract({
		abi: erc20Abi,
		functionName: 'allowance',
		address: from.token.address as Address,
		args: [from.address as Address, config.PARENT_POOL_CONTRACT],
	})

	const parsedFromAmount = parseUnits(from.amount, token.decimals)

	if (allowance < parsedFromAmount) {
		const approveTx = await walletClient.writeContract({
			abi: erc20Abi,
			functionName: 'approve',
			address: from.token.address as Address,
			args: [config.PARENT_POOL_CONTRACT, parsedFromAmount],
			gas: 100_000n,
		})

		const { status } = await publicClient.waitForTransactionReceipt({
			hash: approveTx,
		})

		swapDispatch({
			type: 'SET_SWAP_STEPS',
			payload: [{ title: 'Pending approval', status: 'pending', type: StageType.approve }],
		})

		if (status === 'reverted') {
			throw new Error('Approve transaction reverted')
		}
	}
}
