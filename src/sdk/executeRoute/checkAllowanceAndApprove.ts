import { type Address, erc20Abi, type PublicClient, type WalletClient } from 'viem'
import type { SwapDirectionData } from '../types/routeTypes'
import { conceroAddressesMap } from '../configs/conceroAddressesMap'
import { createBigIntAmount } from '../utils/formatting'

export const checkAllowanceAndApprove = async (
	walletClient: WalletClient,
	publicClient: PublicClient,
	txData: SwapDirectionData,
	clientAddress: Address,
) => {
	const { token, amount, chain } = txData

	const conceroAddress = conceroAddressesMap[chain.id] // TODO change mock dst chain

	const allowance = await publicClient.readContract({
		abi: erc20Abi,
		functionName: 'allowance',
		address: token.address,
		args: [clientAddress, conceroAddress],
	})

	console.log('allowance: ', allowance)

	let approveTxHash = null

	const amountInDecimals = createBigIntAmount(amount, token.decimals)

	if (allowance < amountInDecimals) {
		const { request } = await publicClient.simulateContract({
			account: clientAddress,
			address: token.address,
			abi: erc20Abi,
			functionName: 'approve',
			args: [conceroAddress, amountInDecimals],
		})

		approveTxHash = await walletClient.writeContract(request)
	}

	if (approveTxHash) {
		await publicClient.waitForTransactionReceipt({ hash: approveTxHash })
	}
}
