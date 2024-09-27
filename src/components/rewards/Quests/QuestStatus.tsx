import { Tag } from '../../tags/Tag/Tag'

interface Props {
	daysLeft: number
	isStarted: boolean
	isCompleted: boolean
	rewardIsClaimed: boolean
}

export const QuestStatus = ({ daysLeft, isStarted, isCompleted, rewardIsClaimed }: Props) => {
	let status = `${isStarted ? 'Started, ' : ''} ${daysLeft} ${daysLeft > 1 ? 'days' : 'day'} left`
	if (isCompleted) status = 'Done!'
	if (rewardIsClaimed) status = 'Finished'

	let variant: 'neutral' | 'warning' | 'negative' | 'positive' = 'neutral'
	if (daysLeft <= 3) variant = 'warning'
	if (daysLeft <= 1) variant = 'negative'
	if (isCompleted) variant = 'positive'
	if (rewardIsClaimed) variant = 'neutral'

	return (
		<Tag size="sm" variant={variant}>
			{status}
		</Tag>
	)
}
