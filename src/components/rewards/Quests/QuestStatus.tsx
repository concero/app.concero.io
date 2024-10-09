import { Tag } from '../../tags/Tag/Tag'
import { QuestType } from '../../../api/concero/quest/questType'

interface Props {
	daysLeft: number
	isStarted: boolean
	isCompleted: boolean
	rewardIsClaimed: boolean
	questType: QuestType
}

export const QuestStatus = ({ daysLeft, isStarted, isCompleted, rewardIsClaimed, questType }: Props) => {
	const dayText = daysLeft > 1 ? 'days' : 'day'
	const daysLeftText = daysLeft === 0 ? 'Ends today' : `${daysLeft} ${dayText} left`

	let status = `${isStarted ? 'Started, ' : ''} ${daysLeftText}`
	if (isCompleted) status = 'Done!'
	if (rewardIsClaimed) status = 'Finished'

	let variant: 'neutral' | 'warning' | 'negative' | 'positive' = 'neutral'
	if (daysLeft <= 3) variant = 'warning'
	if (daysLeft <= 1) variant = 'negative'
	if (isCompleted) variant = 'positive'
	if (rewardIsClaimed) variant = 'neutral'

	if (questType === QuestType.Daily && !isCompleted && !rewardIsClaimed) {
		return null
	}

	return (
		<Tag size="sm" variant={variant}>
			{status}
		</Tag>
	)
}
