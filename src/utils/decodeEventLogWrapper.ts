import { type Abi, decodeEventLog, type Hash } from 'viem'
import { type Log } from 'viem/types/log'
import { type DecodeEventLogReturnType } from 'viem/utils/abi/decodeEventLog'
import { type ExplorerLog } from '../api/getLogsByAddress'

interface DecodeEventLogWrapperParams {
	log: Log | ExplorerLog
	abi: Abi
	eventName?: string
}

export const decodeEventLogWrapper = ({
	log,
	abi,
	eventName = undefined,
}: DecodeEventLogWrapperParams): DecodeEventLogReturnType | null => {
	try {
		return decodeEventLog({
			abi,
			eventName,
			data: log.data as Hash,
			topics: log.topics,
		})
	} catch (e) {
		return null
	}
}
