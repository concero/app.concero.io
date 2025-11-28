import { useMemo } from 'react'
import { getIsCanClaimQuest } from '@/entities/User'
import { TQuest, TQuestBlocker, TUserQuest } from '../types/response'
import { categoryQuestNameMap } from '../../config/nameMaps'

export const useQuestCardLogic = (quest: TQuest, userQuest?: TUserQuest) => {
	const size = quest.size
	const rewardIsClaimed = Boolean(userQuest?.finished_at)
	const isCanClaimQuest = getIsCanClaimQuest({ quest, userQuest })

	const showMetaInfo = size !== 's'
	const showImage = size !== 's' && size !== 'm'

	const reward = useMemo(() => {
		const min = quest.quest_reward?.tokenReward?.min_value ?? 0
		const max = quest.quest_reward?.tokenReward?.max_value ?? 0
		return Math.max(min, max)
	}, [quest.quest_reward])

	const categoryLabel = categoryQuestNameMap[quest.category]

	const isLocked = size === 'm' || !!quest.blocker

	return {
		size,
		rewardIsClaimed,
		isCanClaimQuest,
		isLocked,
		showMetaInfo,
		showImage,
		reward,
		categoryLabel,
	}
}
