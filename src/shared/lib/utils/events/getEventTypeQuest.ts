import { TQuest } from '@/entities/Quest'
type TTypeQuestEvents = 'daily' | 'testing' | 'rewards'
export const getEventTypeQuest = (quest: TQuest): TTypeQuestEvents => {
	if (quest.type == 'Daily') {
		return 'daily'
	} else if (quest.tag == 'testing') {
		return 'testing'
	} else {
		return 'rewards'
	}
}
