import { lockTextMap } from '../../../config/lockTextMap'
import { TQuestBlocker } from '../../types/response'
type TKey = string
type TMessage = string
export type TTuple = [TKey, TMessage]
export function getBlockerMessages(blocker: TQuestBlocker | null): TTuple[] {
	if (!blocker) return []
	const result: TTuple[] = []
	Object.entries(blocker)
		.filter(([, value]) => value !== null && value !== undefined && value > 0)
		.forEach(([key, value]) => {
			const formatter = lockTextMap[key as keyof TQuestBlocker]
			if (value) {
				result.push([key, formatter(value)])
			}
		})

	return result
}
