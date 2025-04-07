import { TQuestType } from '../../model/types/schema'
import dayjs from 'dayjs'
import { normalizeEndDate } from '../../model/lib/normalizeEndDate'
import { getQuestDaysLeft } from '../../model/lib/getQuestDaysLeft'
import { TUserResponse } from '@/entities/User/model/types/response'
import { TQuest } from '../../model/types/response'
import { Tag } from '@concero/ui-kit'

export const getDateUnitMap = (type: TQuestType) => {
	if (type === 'Daily') return 'day'
	if (type === 'Primary' || type === 'Secondary') return 'week'
	if (type === 'Monthly') return 'month'

	return null
}

interface Props {
	quest: TQuest
	isClaimed?: boolean
	questsInProgress?: TUserResponse['questsInProgress']
}
export const QuestStatus = ({ quest, isClaimed, questsInProgress }: Props) => {
	const { name, endDate, startDate, type: questType, steps, _id } = quest

	const questInProgress = questsInProgress
		? questsInProgress.find(({ questId }) => questId === _id.toString())?.completedSteps
		: []
	const completedStepIds = questInProgress ?? []
	const isStarted = completedStepIds.length > 0
	const normalizedEndDate = normalizeEndDate(endDate)
	const normalizedStartDate = normalizeEndDate(startDate)
	const readyToClaim = completedStepIds.length === steps.length
	const isNewQuest = quest.isNew && dayjs().diff(dayjs(normalizedStartDate), 'day') <= 7
	const daysLeft = getQuestDaysLeft(normalizedEndDate)
	const dayText = daysLeft > 1 ? 'days' : 'day'
	const isRepeat = !!getDateUnitMap(questType)
	const daysLeftText = daysLeft === 0 ? 'Ends today' : `${daysLeft} ${dayText} ${isRepeat ? 'to reset' : 'left'}`

	let status = `${isStarted ? 'Started, ' : ''} ${daysLeftText}`

	if (readyToClaim) status = ' Done'
	if (isClaimed) status = 'Completed!'

	let variant: 'neutral' | 'warning' | 'negative' | 'positive' = 'neutral'
	if (daysLeft <= 3) variant = 'warning'
	if (daysLeft <= 1) variant = 'negative'
	if (readyToClaim) variant = 'positive'
	if (isClaimed) variant = 'neutral'

	if (questType === 'Daily' && !readyToClaim && !isClaimed) {
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
