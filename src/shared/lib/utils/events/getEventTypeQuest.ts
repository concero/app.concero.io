import { TQuest } from '@/entities/Quest'
type TTypeQuestEvents = 'daily' | 'testing' | 'rewards'
export const getEventTypeQuest = (quest: TQuest): TTypeQuestEvents => {
	if (quest.interval == 'daily') {
		return 'daily'
	} else return quest.group
}
