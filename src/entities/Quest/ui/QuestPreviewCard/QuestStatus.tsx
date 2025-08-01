import dayjs from 'dayjs'
import { normalizeEndDate } from '../../model/lib/normalizeEndDate'
import { getQuestDaysLeft } from '../../model/lib/getQuestDaysLeft'
import { TUserResponse } from '@/entities/User/model/types/response'
import { TQuest } from '../../model/types/response'
import { Tag } from '@concero/ui-kit'
import { TQuestInterval } from '../../model/types/schema'

export const getDateUnitMap = (interval: TQuestInterval) => {
	if (interval === 'daily') return 'day'
	if (interval === 'weekly') return 'week'
	if (interval === 'monthly') return 'month'

	return null
}

interface Props {
	quest: TQuest
	isClaimed?: boolean
	questsInProgress?: TUserResponse['questsInProgress']
}
export const QuestStatus = ({ quest, isClaimed, questsInProgress }: Props) => {
	const { title, finished_at, started_at, interval, tasks, id } = quest

	const questInProgress = questsInProgress
		? questsInProgress.find(({ questId }) => questId === id.toString())?.completedSteps
		: []
	const completedStepIds = questInProgress ?? []
	const stepsCount = tasks
		.filter(task => task.is_required)
		.reduce((sum, task) => {
			return sum + task.steps.length
		}, 0)

	const isStarted = completedStepIds.length > 0
	const readyToClaim = completedStepIds.length === stepsCount
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
