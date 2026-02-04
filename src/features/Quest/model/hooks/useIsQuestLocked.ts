import { TQuest } from '@/entities/Quest'
import { findXTask } from '@/entities/Quest/model/lib/findXTask'
import { hasConnectedX } from '@/entities/Quest/model/lib/hasConnectedX'
import { useSocials } from '@/entities/User'

export const useIsQuestLocked = ({ address, quest }: { quest: TQuest; address?: string }) => {
	const { data: socialsResponse } = useSocials(address)

	if (
		Boolean(findXTask({ quest })) &&
		socialsResponse?.payload?.socials &&
		!hasConnectedX({ socials: socialsResponse.payload.socials })
	) {
		return true
	}
	return false
}
