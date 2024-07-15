import { createPublicClient, decodeEventLog, formatUnits, parseAbiItem } from 'viem'
import { baseSepolia } from 'wagmi/chains'
import { http } from 'wagmi'
import { abi } from '../../../abi/ParentPool.json'
import { type DecodeEventLogReturnType } from 'viem/utils/abi/decodeEventLog'
import { type UserTransaction } from './UserActionsCard'
import { config } from '../../../constants/config'
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

dayjs.extend(isSameOrBefore)

const publicClient = createPublicClient({
	chain: baseSepolia,
	transport: http(),
})

export const watchUserActions = async (onGetActions: (logs: DecodeEventLogReturnType[]) => any) => {
	try {
		const blockNumber = await publicClient.getBlockNumber()
		const firstBlockNumber = 12132922n

		const blockRange = 1999n
		let toBlock = blockNumber
		let fromBlock = blockNumber - blockRange

		let countTx = 0

		while (Number(toBlock) >= Number(firstBlockNumber) || countTx <= 30) {
			const currentBlock = await publicClient.getBlock({
				blockNumber: toBlock,
			})

			const date = dayjs(Number(currentBlock.timestamp) * 1000)
			const now = dayjs()
			const oneWeekAgo = now.subtract(1, 'week')
			const isMoreThanWeekAgo = date.isSameOrBefore(oneWeekAgo)

			console.log('isMoreThanAWeekAgo', isMoreThanWeekAgo)

			const logs = await publicClient.getLogs({
				address: config.PARENT_POOL_CONTRACT,
				event: parseAbiItem(
					'event ParentPool_SuccessfulDeposited(address liquidityProvider, uint256 _amount, address _token)',
				),
				toBlock,
				fromBlock,
			})

			const decodedLogs = []
			for (const log of logs) {
				try {
					const decodedLog = decodeEventLog({
						abi,
						data: log.data,
						topics: log.topics,
					})

					const block = await publicClient.getBlock({
						blockHash: log.blockHash,
					})

					const result: UserTransaction = {
						time: Number(block.timestamp) * 1000,
						amount: formatUnits(decodedLog.args!._amount, 6),
						eventName: decodedLog.eventName!,
						status: null,
					}

					decodedLogs.push(result)
				} catch (err) {
					continue
				}
			}

			onGetActions(decodedLogs)
			countTx++

			toBlock -= blockRange
			fromBlock -= blockRange
		}
	} catch (err) {
		console.error(err)
		console.error(err.message)

		return []
	}
}
