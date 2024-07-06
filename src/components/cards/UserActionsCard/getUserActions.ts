import { createPublicClient, decodeEventLog, formatUnits, parseAbiItem } from 'viem'
import { baseSepolia } from 'wagmi/chains'
import { http } from 'wagmi'
import { abi } from '../../../abi/ParentPool.json'
import { type DecodeEventLogReturnType } from 'viem/utils/abi/decodeEventLog'
import { type UserTransaction } from './UserActionsCard'

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

		while (Number(toBlock) >= Number(firstBlockNumber)) {
			const logs = await publicClient.getLogs({
				address: '0x3997e8Fc5C47AFE6B298E8eB7d030e96Eb7c4b0d',
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

			toBlock -= blockRange
			fromBlock -= blockRange
		}
	} catch (err) {
		console.error(err)
		console.error(err.message)

		return []
	}
}
