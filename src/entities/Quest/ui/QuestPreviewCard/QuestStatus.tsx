import dayjs from 'dayjs'
import { getQuestDaysLeft } from '../../model/lib/getQuestDaysLeft'
import { TQuest, TQuestInterval, TUserQuest } from '../../model/types/response'
import { Tag } from '@concero/ui-kit'
import { getIsCanClaimQuest } from '@/entities/User'

export const getDateUnitMap = (interval: TQuestInterval) => {
	if (interval === 'daily') return 'day'
	if (interval === 'weekly') return 'week'
	if (interval === 'monthly') return 'month'

	return null
}

interface Props {
	quest: TQuest
	isClaimed?: boolean
	userQuest?: TUserQuest
}
export const QuestStatus = ({ quest, isClaimed, userQuest }: Props) => {
	const { finished_at, started_at, interval } = quest
	if (!userQuest) return null
	const completedStepIds = userQuest?.steps ?? []

	const isStarted = completedStepIds.length > 0

	const readyToClaim = getIsCanClaimQuest({ quest, userQuest })
	const isNewQuest = quest.is_new && dayjs().diff(dayjs(started_at), 'day') <= 7
	const daysLeft = getQuestDaysLeft(finished_at)

	const dayText = daysLeft > 1 ? 'days' : 'day'
	const isRepeat = !!getDateUnitMap(interval)
	const daysLeftText = daysLeft === 0 ? 'Ends today' : `${daysLeft} ${dayText} ${isRepeat ? 'to reset' : 'left'}`

	let status = `${isStarted ? 'Started, ' : ''} ${daysLeftText}`

	if (readyToClaim) status = ' Done'
	if (isClaimed) status = 'Completed!'

	let variant: 'neutral' | 'warning' | 'negative' | 'positive' = 'neutral'
	if (daysLeft <= 3) variant = 'warning'
	if (daysLeft <= 1) variant = 'negative'
	if (readyToClaim) variant = 'positive'
	if (isClaimed) variant = 'neutral'

	if (interval === 'daily' && !readyToClaim && !isClaimed) {
		return null
	}

	return (
		<div className="row gap-xs">
			{isNewQuest && (
				<Tag size="s" variant={'branded'}>
					New!
				</Tag>
			)}
			<Tag size="s" variant={variant}>
				{status}
			</Tag>
		</div>
	)
}
