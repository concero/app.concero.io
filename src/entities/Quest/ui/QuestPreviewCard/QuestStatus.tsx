import { TQuest, TQuestType } from '../../model/types/schema'
import { Tag } from '@/components/layout/Tag/Tag'
import dayjs from 'dayjs'
import { normalizeEndDate } from '../../model/lib/normalizeEndDate'
import { getQuestDaysLeft } from '../../model/lib/getQuestDaysLeft'
import { TUserResponse } from '@/entities/User/model/types/response'

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
	const isOpQuest = name === 'Lancan OP' //                           ------------ IS TEMP ROW !!!
	const normalizedEndDate = normalizeEndDate(endDate)
	const normalizedStartDate = normalizeEndDate(startDate)
	const isCompleted = completedStepIds.length === steps.length
	const isNewQuest = isOpQuest && dayjs().diff(dayjs(normalizedStartDate), 'day') <= 7 //------------ isOpQuest IS TEMP !!!
	const daysLeft = getQuestDaysLeft(normalizedEndDate)
	const dayText = daysLeft > 1 ? 'days' : 'day'
	const isRepeat = isOpQuest ? false : !!getDateUnitMap(questType)
	const daysLeftText = daysLeft === 0 ? 'Ends today' : `${daysLeft} ${dayText} ${isRepeat ? 'to reset' : 'left'}`

	let status = `${isStarted ? 'Started, ' : ''} ${daysLeftText}`

	if (isCompleted) status = 'Completed!'
	if (isClaimed) status = 'Done'

	let variant: 'neutral' | 'warning' | 'negative' | 'positive' = 'neutral'
	if (daysLeft <= 3) variant = 'warning'
	if (daysLeft <= 1) variant = 'negative'
	if (isCompleted) variant = 'neutral'
	if (isClaimed) variant = 'positive'

	if (questType === 'Daily' && !isCompleted && !isClaimed) {
		return null
	}

	return (
		<div className="row gap-xs">
			{isNewQuest && (
				<Tag size="sm" variant={'branded'}>
					New
				</Tag>
			)}
			<Tag size="sm" variant={variant}>
				{status}
			</Tag>
		</div>
	)
}
