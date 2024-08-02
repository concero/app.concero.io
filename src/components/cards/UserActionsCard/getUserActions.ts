import { type Address, createPublicClient, fallback, formatUnits } from 'viem'
import { base } from 'wagmi/chains'
import { http } from 'wagmi'
import { abi } from '../../../abi/ParentPool.json'
import { type UserTransaction } from './UserActionsCard'
import { config } from '../../../constants/config'
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

dayjs.extend(isSameOrBefore)

const publicClient = createPublicClient({
	chain: base,
	transport: fallback([http('https://base-rpc.publicnode.com'), http('https://base.drpc.org')]),
})

export const watchUserActions = async (address: Address, onGetActions: (logs: UserTransaction[]) => any) => {
	const blockNumber = await publicClient.getBlockNumber()
	const firstBlockNumber = 17868906n

	const blockRange = 50_000n
	let toBlock = blockNumber
	let fromBlock = blockNumber - blockRange

	let countTx = 0

	while (toBlock >= firstBlockNumber) {
		countTx++

		const events = await publicClient.getContractEvents({
			address: config.PARENT_POOL_CONTRACT,
			abi,
			eventName: 'ConceroParentPool_DepositCompleted',
			args: {
				lpAddress: address,
			},
			toBlock,
			fromBlock,
		})

		const userActions: UserTransaction[] = []

		console.log(events)
		for (const event of events) {
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

		onGetActions(
			userActions.sort((a, b) => {
				return b.time - a.time
			}),
		)

		toBlock -= blockRange
		fromBlock -= blockRange
	}
}
