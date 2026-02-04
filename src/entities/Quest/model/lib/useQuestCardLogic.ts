import { useMemo } from 'react'
import { getIsCanClaimQuest, TUserResponse } from '@/entities/User'
import { TQuest, TUserQuest } from '../types/response'
import { categoryQuestNameMap } from '../../config/nameMaps'
import { useIsQuestLocked } from '@/features/Quest/model/hooks/useIsQuestLocked'
export const useQuestCardLogic = ({
	quest,
	address,
	userQuest,
}: {
	quest: TQuest
	userQuest?: TUserQuest
	address?: string
}) => {
	const size = quest.size
	const rewardIsClaimed = Boolean(userQuest?.finished_at)
	const isCanClaimQuest = getIsCanClaimQuest({ quest, userQuest })
	const isLocked = useIsQuestLocked({ address, quest })
	const showMetaInfo = size !== 's'
	const showImage = size !== 's' && size !== 'm'

	const reward = useMemo(() => {
		const min = quest.quest_reward?.tokenReward?.min_value ?? 0
		const max = quest.quest_reward?.tokenReward?.max_value ?? 0
		return Math.max(min, max)
	}, [quest.quest_reward])

	const categoryLabel = categoryQuestNameMap[quest.category]

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
