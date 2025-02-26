import { Tag } from '../../layout/Tag/Tag'
import { QuestType } from '../../../api/concero/quest/questType'
import { SkeletonLoader } from '../../layout/SkeletonLoader/SkeletonLoader'

interface Props {
	daysLeft: number
	isStarted: boolean
	isCompleted: boolean
	rewardIsClaimed: boolean
	questType: QuestType
	isRepeat?: boolean
	isLoading?: boolean
	isNew?: boolean
}
/**@deprecated */
export const QuestStatus = ({
	daysLeft,
	isStarted,
	isCompleted,
	rewardIsClaimed,
	questType,
	isRepeat = false,
	isLoading,
	isNew,
}: Props) => {
	const dayText = daysLeft > 1 ? 'days' : 'day'
	const daysLeftText = daysLeft === 0 ? 'Ends today' : `${daysLeft} ${dayText} ${isRepeat ? 'to reset' : 'left'}`
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

	if (isLoading) {
		return <SkeletonLoader width={132} height={26} />
	}

	return (
		<div className="row gap-xs">
			{isNew && (
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
