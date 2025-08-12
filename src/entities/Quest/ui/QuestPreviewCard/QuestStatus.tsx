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

export const QuestTagIsNew = (props: { started_at: number; isNew: boolean }) => {
	const { isNew, started_at } = props
	if (!isNew) {
		return null
	}
	if (dayjs().diff(dayjs(started_at * 1000), 'day') > 7) {
		return null
	}
	return (
		<Tag size="s" variant={'branded'}>
			New!
		</Tag>
	)
}

const getColorVariant = (args: { daysLeft: number; readyToClaim: boolean; isClaimed?: boolean }) => {
	const { daysLeft, isClaimed, readyToClaim } = args
	let variant: 'neutral' | 'warning' | 'negative' | 'positive' = 'neutral'
	if (daysLeft <= 3) variant = 'warning'
	if (daysLeft <= 1) variant = 'negative'
	if (readyToClaim) variant = 'positive'
	if (isClaimed) variant = 'neutral'
	return variant
}

interface Props {
	quest: TQuest
	isClaimed?: boolean
	userQuest?: TUserQuest
}
export const QuestStatus = ({ quest, isClaimed, userQuest }: Props) => {
	const { finished_at, started_at, interval } = quest

	if (!userQuest) {
		return (
			<div className="row gap-xs">
				<QuestTagIsNew isNew={quest.is_new} started_at={started_at} />
			</div>
		)
	}
	const completedStepIds = userQuest?.steps ?? []

	const isStarted = completedStepIds.length > 0

	const readyToClaim = getIsCanClaimQuest({ quest, userQuest })

	const daysLeft = getQuestDaysLeft(finished_at)

	const dayText = daysLeft > 1 ? 'days' : 'day'
	const isRepeat = !!getDateUnitMap(interval)
	const daysLeftText = daysLeft === 0 ? 'Ends today' : `${daysLeft} ${dayText} ${isRepeat ? 'to reset' : 'left'}`

	let status = `${isStarted ? 'Started, ' : ''} ${daysLeftText}`

	if (readyToClaim) status = ' Done'
	if (isClaimed) status = 'Completed!'

	if (interval === 'daily' && !readyToClaim && !isClaimed) {
		return null
	}
	const variant = getColorVariant({ daysLeft, isClaimed, readyToClaim })
	return (
		<div className="row gap-xs">
			<QuestTagIsNew isNew={quest.is_new} started_at={started_at} />
			<Tag size="s" variant={variant}>
				{status}
			</Tag>
		</div>
	)
}
