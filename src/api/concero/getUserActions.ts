import { type Address, createPublicClient, fallback, formatUnits } from 'viem'
import { base } from 'wagmi/chains'
import { http } from 'wagmi'
import { abi } from '../../abi/ParentPool.json'
import { type UserTransaction } from '../../components/cards/UserActionsCard/UserActionsCard'
import { config } from '../../constants/config'
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

dayjs.extend(isSameOrBefore)

const publicClient = createPublicClient({
	chain: base,
	transport: fallback([http('https://base-rpc.publicnode.com'), http('https://base.drpc.org')]),
})

export const getWithdrawStatus = async (address: Address) => {
	const blockNumber = await publicClient.getBlockNumber()
	const firstBlockNumber = 17868906n

	const blockRange = 50_000n
	let toBlock = blockNumber
	let fromBlock = blockNumber - blockRange

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

		for (const event of eventsWithdrawComplete) {
			if (event.args.to.toLowerCase() === address.toLowerCase()) {
				return 'startWithdraw'
			}
		}

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

		for (const event of eventsWithdrawRequest) {
			if (event.args.caller.toLowerCase() === address.toLowerCase()) {
				// const block = await publicClient.getBlock({
				// 	blockNumber: event.blockNumber,
				// })

				// TODO: add date logic
				return 'completeWithdrawal'
			}
		}

		toBlock -= blockRange
		fromBlock -= blockRange
	}

	return 'startWithdraw'
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

			console.log(event)

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
