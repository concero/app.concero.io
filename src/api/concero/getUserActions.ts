import { type Address, formatUnits, type Log, parseAbi } from 'viem'
import { arbitrum, avalanche, base, polygon } from 'wagmi/chains'
import { abi } from '../../abi/ParentPool.json'
import { UserActionStatus, type UserTransaction } from '../../components/cards/UserActionsCard/UserActionsCard'
import { config } from '../../constants/config'
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { getPublicClient } from '@wagmi/core'
import { config as wagmiConfig } from '../../web3/wagmi'
import { poolsAddressesMap } from '../../constants/poolsAddressesMap'
import { getWithdrawalIdByLpAddress } from './getWithdrawalIdByLpAddress'

dayjs.extend(isSameOrBefore)
const publicClient = getPublicClient(wagmiConfig, { chainId: base.id })

export const getLastDeposit = async (address: Address): Promise<Log | null> => {
	const firstBlockNumber = 17868906n

	const blockRange = 50_000n
	let toBlock = await publicClient.getBlockNumber()
	let fromBlock = toBlock - blockRange

	while (toBlock >= firstBlockNumber) {
		const eventsDeposit = await publicClient.getContractEvents({
			address: config.PARENT_POOL_CONTRACT,
			abi,
			eventName: 'ConceroParentPool_DepositCompleted',
			args: {
				lpAddress: address,
			},
			toBlock,
			fromBlock,
		})

		for (const event of eventsDeposit) {
			const receipt = await publicClient.getTransactionReceipt({
				hash: event.transactionHash,
			})

			if (receipt.from.toLowerCase() === address.toLowerCase()) {
				return event
			}
		}

		toBlock -= blockRange
		fromBlock -= blockRange
	}

	return null
}

export const poolEventNamesMap = {
	ConceroParentPool_DepositCompleted: 'Liquidity provided',
	ConceroParentPool_WithdrawRequestInitiated: 'Withdrawal Submitted',
	ConceroParentPool_Withdrawn: 'Withdrawal Complete',
}

export const watchUserActions = async (address: Address, onGetActions: (txs: UserTransaction[]) => any) => {
	const blockNumber = await publicClient.getBlockNumber()
	const firstBlockNumber = 17868906n

	const blockRange = 50_000n
	let toBlock = blockNumber
	let fromBlock = blockNumber - blockRange

	while (toBlock >= firstBlockNumber) {
		const eventsDeposit = await publicClient.getContractEvents({
			address: config.PARENT_POOL_CONTRACT,
			abi,
			eventName: 'ConceroParentPool_DepositCompleted',
			toBlock,
			fromBlock,
		})

		const eventsRequestWithdraw = await publicClient.getContractEvents({
			address: config.PARENT_POOL_CONTRACT,
			abi,
			eventName: 'ConceroParentPool_WithdrawRequestInitiated',
			toBlock,
			fromBlock,
		})

		const eventsCompleteWithdraw = await publicClient.getContractEvents({
			address: config.PARENT_POOL_CONTRACT,
			abi,
			eventName: 'ConceroParentPool_Withdrawn',
			toBlock,
			fromBlock,
		})

		const userActions: UserTransaction[] = []

		for (const event of eventsDeposit) {
			const block = await publicClient.getBlock({
				blockNumber: event.blockNumber,
			})

			const result: UserTransaction = {
				time: Number(block.timestamp) * 1000,
				amount: formatUnits(event.args!.usdcAmount, 6),
				eventName: event.eventName,
				status: UserActionStatus.CompleteDeposit,
				transactionHash: event.transactionHash,
				address: event.args.lpAddress,
				args: event.args,
			}

			userActions.push(result)
		}

		for (const event of eventsRequestWithdraw) {
			const block = await publicClient.getBlock({
				blockNumber: event.blockNumber,
			})

			const result: UserTransaction = {
				time: Number(block.timestamp) * 1000,
				amount: '0',
				eventName: event.eventName,
				status: UserActionStatus.CompleteRequestWithdraw,
				transactionHash: event.transactionHash,
				address: event.args.caller,
				deadline: event.args.deadline ? Number(event.args.deadline) : null,
			}

			userActions.push(result)
		}

		for (const event of eventsCompleteWithdraw) {
			const block = await publicClient.getBlock({
				blockNumber: event.blockNumber,
			})

			const result: UserTransaction = {
				time: Number(block.timestamp) * 1000,
				amount: formatUnits(event.args!.amount, 6),
				eventName: event.eventName,
				status: UserActionStatus.CompleteWithdraw,
				transactionHash: event.transactionHash,
				address: event.args.to,
			}

			userActions.push(result)
		}

		const sortedUserActions = userActions
			.filter(event => event.address.toLowerCase() === address.toLowerCase())
			.sort((a, b) => {
				return b.time - a.time
			})

		onGetActions(sortedUserActions)

		toBlock -= blockRange
		fromBlock -= blockRange
	}
}

export const isWithdrawRequestFailed = async (withdrawRequestId: string): Promise<boolean> => {
	const chainsToCheck = [polygon.id, avalanche.id, arbitrum.id]
	const publicClients = chainsToCheck.map(chainId => getPublicClient(wagmiConfig, { chainId }))
	const statuses = await Promise.all(
		publicClients.map(async publicCLient => {
			return await publicCLient.readContract({
				address: poolsAddressesMap[publicCLient.chainId],
				abi: parseAbi(['function s_withdrawRequests(bytes32) view returns (bool)']),
				functionName: 's_withdrawRequests',
				args: [withdrawRequestId],
			})
		}),
	)

	console.log(statuses)
}

export const handleWithdrawRequestActions = async (actions: UserTransaction[]) => {
	const withdrawId = await getWithdrawalIdByLpAddress('0xffb54219e8e4b0e08e5fa503edc1cf3080f73869')
	console.log(withdrawId)
	if (withdrawId && withdrawId !== '0x0000000000000000000000000000000000000000000000000000000000000000') {
		const isFailed = await isWithdrawRequestFailed(withdrawId)
	}

	for (const action of actions) {
		if (action.eventName === 'ConceroParentPool_Withdrawn') {
			break
		}

		if (action.eventName === 'ConceroParentPool_WithdrawRequestInitiated') {
			action.status = UserActionStatus.ActiveRequestWithdraw
			break
		}
	}

	return actions
}
