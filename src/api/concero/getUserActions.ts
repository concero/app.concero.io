import { type Address, createPublicClient, fallback, formatUnits } from 'viem'
import { base } from 'wagmi/chains'
import { http } from 'wagmi'
import { abi } from '../../abi/ParentPool.json'
import { type UserTransaction } from '../../components/cards/UserActionsCard/UserActionsCard'
import { config } from '../../constants/config'
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { WithdrawStatus } from '../../components/cards/PoolCard/swapExecution/requestWithdraw'

dayjs.extend(isSameOrBefore)

const publicClient = createPublicClient({
	chain: base,
	transport: fallback([http('https://base-rpc.publicnode.com'), http('https://base.drpc.org')]),
})

const sortByBlockNumber = events => {
	return events.sort((a, b) => {
		return Number(b.blockNumber) - Number(a.blockNumber)
	})
}

export const getWithdrawStatus = async (address: Address): Promise<WithdrawStatus> => {
	const firstBlockNumber = 17868906n

	const blockRange = 50_000n
	let toBlock = await publicClient.getBlockNumber()
	let fromBlock = toBlock - blockRange

	while (toBlock >= firstBlockNumber) {
		const eventsWithdrawComplete = await publicClient.getContractEvents({
			address: config.PARENT_POOL_CONTRACT,
			abi,
			eventName: 'ConceroParentPool_Withdrawn',
			args: {
				to: address,
			},
			toBlock,
			fromBlock,
		})

		const eventsWithdrawRequest = await publicClient.getContractEvents({
			address: config.PARENT_POOL_CONTRACT,
			abi,
			eventName: 'ConceroParentPool_WithdrawRequestInitiated',
			args: {
				caller: address,
			},
			toBlock,
			fromBlock,
		})

		const lastCompleteEvent = sortByBlockNumber(eventsWithdrawComplete).find(
			event => event.args.to.toLowerCase() === address.toLowerCase(),
		)
		const lastRequestEvent = sortByBlockNumber(eventsWithdrawRequest).find(
			event => event.args.caller.toLowerCase() === address.toLowerCase(),
		)

		if (lastRequestEvent && lastCompleteEvent) {
			const blockRequestEvent = await publicClient.getBlock({
				blockNumber: lastRequestEvent.blockNumber,
			})

			const blockCompleteEvent = await publicClient.getBlock({
				blockNumber: lastCompleteEvent.blockNumber,
			})

			console.log('blockCompleteEvent', new Date(Number(blockCompleteEvent.timestamp) * 1000))
			console.log('blockRequestEvent', new Date(Number(blockRequestEvent.timestamp) * 1000))

			console.log(blockCompleteEvent.timestamp, blockRequestEvent.timestamp)

			if (blockCompleteEvent.timestamp > blockRequestEvent.timestamp) {
				return WithdrawStatus.startWithdraw
			} else {
				return WithdrawStatus.completeWithdrawal
			}
		}

		if (lastRequestEvent && !lastCompleteEvent) {
			return WithdrawStatus.completeWithdrawal
		}

		toBlock -= blockRange
		fromBlock -= blockRange
	}

	return WithdrawStatus.startWithdraw
}

export const watchUserActions = async (address: Address, onGetActions: (logs: UserTransaction[]) => any) => {
	const blockNumber = await publicClient.getBlockNumber()
	const firstBlockNumber = 17868906n

	const blockRange = 50_000n
	let toBlock = blockNumber
	let fromBlock = blockNumber - blockRange

	let countTx = 0

	while (toBlock >= firstBlockNumber) {
		countTx++

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

		const eventsWithdraw = await publicClient.getContractEvents({
			address: config.PARENT_POOL_CONTRACT,
			abi,
			eventName: 'ConceroParentPool_WithdrawRequestInitiated',
			args: {
				lpAddress: address,
			},
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
				status: null,
				transactionHash: event.transactionHash,
				address: '',
			}

			userActions.push(result)
		}

		for (const event of eventsWithdraw) {
			const block = await publicClient.getBlock({
				blockNumber: event.blockNumber,
			})

			const result: UserTransaction = {
				time: Number(block.timestamp) * 1000,
				amount: 0,
				eventName: event.eventName,
				status: null,
				transactionHash: event.transactionHash,
				address: '',
			}

			userActions.push(result)
		}

		onGetActions(
			userActions.sort((a, b) => {
				return b.time - a.time
			}),
		)

		toBlock -= blockRange
		fromBlock -= blockRange
	}
}
