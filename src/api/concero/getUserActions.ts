import { type Address, parseAbi } from 'viem'
import { arbitrum, avalanche, polygon } from 'wagmi/chains'
import { UserActionStatus, type UserTransaction } from '../../components/cards/UserActionsCard/UserActionsCard'
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { getPublicClient } from '@wagmi/core'
import { config as wagmiConfig } from '../../web3/wagmi'
import { poolsAddressesMap } from '../../constants/conceroContracts'
import { getWithdrawalIdByLpAddress } from './getWithdrawalIdByLpAddress'

dayjs.extend(isSameOrBefore)

export const poolEventNamesMap = {
	ConceroParentPool_DepositCompleted: 'Liquidity provided',
	ConceroParentPool_WithdrawRequestInitiated: 'Withdrawal Submitted',
	ConceroParentPool_Withdrawn: 'Withdrawal Complete',
}

export const isWithdrawRequestFailed = async (withdrawRequestId: string): Promise<boolean> => {
	try {
		const chainsToCheck = [polygon.id, avalanche.id, arbitrum.id]
		const publicClients = chainsToCheck.map(chainId => getPublicClient(wagmiConfig, { chainId }))
		const statuses = await Promise.all(
			publicClients.map(async publicClient => {
				return await publicClient.readContract({
					address: poolsAddressesMap[publicClient.chain.id],
					abi: parseAbi(['function s_withdrawRequests(bytes32) view returns (bool)']),
					functionName: 's_withdrawRequests',
					args: [withdrawRequestId],
				})
			}),
		)

		return statuses.some(status => !status)
	} catch (error) {
		console.error(error)
		return false
	}
}

export const handleWithdrawRequestActions = async (actions: UserTransaction[], lpAddress: Address) => {
	for (const action of actions) {
		if (action.eventName === 'ConceroParentPool_Withdrawn') {
			break
		}

		if (action.eventName === 'ConceroParentPool_WithdrawRequestInitiated') {
			const now = Math.floor(Date.now() / 1000)
			const oneHour = 3600

			action.isActiveWithdraw = true

			if (action.args.deadline + oneHour <= now) {
				const withdrawId = await getWithdrawalIdByLpAddress(lpAddress)
				if (withdrawId && withdrawId !== '0x0000000000000000000000000000000000000000000000000000000000000000') {
					const isFailed = await isWithdrawRequestFailed(withdrawId)
					if (isFailed) {
						action.status = UserActionStatus.WithdrawRetryNeeded
						break
					}
				}
				action.status = UserActionStatus.ActiveRequestWithdraw
				break
			}
		}
	}

	return actions
}
