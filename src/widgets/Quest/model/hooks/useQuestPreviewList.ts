import { useMemo } from 'react'
import { useAccount } from 'wagmi'
import { TUserQuest, useAllQuests, useUserQuests } from '@/entities/Quest'
import { TQuestGroup } from '@/entities/Quest'

type UseQuestPreviewListProps = {
	groups: TQuestGroup[]
}

export const useQuestPreviewList = (props: UseQuestPreviewListProps) => {
	const { groups } = props
	const { data: questsWrap, isFetching } = useAllQuests()
	const { address } = useAccount()

	const quest_ids = questsWrap?.quests.map(quest => quest.id)
	const { data: userQuestsResponse } = useUserQuests({ address, quest_ids, skip: 0, take: 50 })

	const quests = questsWrap?.quests.filter(q => groups.includes(q.group))
	console.table(quests)

	const quest_size_m = useMemo(() => {
		return quests?.filter(q => q.size === 'm').toSorted((a, b) => (b.sort_index || 0) - (a.sort_index || 0))
	}, [quests])

	const quest_size_l = useMemo(() => {
		return quests?.filter(q => q.size === 'l').toSorted((a, b) => (b.sort_index || 0) - (a.sort_index || 0))
	}, [quests])

	const quest_size_xl = useMemo(() => {
		return quests?.filter(q => q.size === 'xl').toSorted((a, b) => (b.sort_index || 0) - (a.sort_index || 0))
	}, [quests])

	const questInstanceId_userQuest_map: Record<string, TUserQuest> = useMemo(() => {
		return (
			userQuestsResponse?.payload.userQuests.reduce(
				(sum, userQuest) => ({ ...sum, [userQuest.questInstanceId]: userQuest }),
				{} as Record<string, TUserQuest>,
			) || {}
		)
	}, [userQuestsResponse])

	return {
		quest_size_xl,
		quest_size_l,
		quest_size_m,
		questInstanceId_userQuest_map,
		isFetching,
	}
}
