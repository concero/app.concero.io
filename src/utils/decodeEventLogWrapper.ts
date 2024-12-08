import { type Abi, decodeEventLog, type Hash } from 'viem'
import { type Log } from 'viem/types/log'
import { type DecodeEventLogReturnType } from 'viem/utils/abi/decodeEventLog'

interface DecodeEventLogWrapperParams {
	log: Log
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
			data: log.data,
			topics: log.topics,
		})
	} catch (e) {
		return null
	}
}
