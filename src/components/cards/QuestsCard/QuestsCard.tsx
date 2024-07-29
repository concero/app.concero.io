import classNames from './QuestsCard.module.pcss'
import { Card } from '../Card/Card'
import { Tag } from '../../tags/Tag/Tag'
import LifiLogo from './LifiLofo.svg'
import { IconArrowUpRight } from '@tabler/icons-react'
import { Button } from '../../buttons/Button/Button'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { getQuestStatus } from './getQuestStatus'
import { UserHistory } from '../../modals/RewardsUserHistory/RewardsUserHistory'

const quests: Quest[] = [
	{
		dateStart: dayjs().subtract(5, 'day').toDate(),
		dateEnd: dayjs().add(2, 'day').toDate(),
		title: 'Exclusive LIFI OAT Airdrop',
	},
	{
		dateStart: dayjs().toDate(),
		dateEnd: dayjs().add(14, 'day').toDate(),
		title: 'Exclusive Concero Airdrop',
	},
	{
		dateStart: dayjs().toDate(),
		dateEnd: dayjs().add(14, 'day').toDate(),
		title: 'Small quest',
	},
	{
		dateStart: dayjs().toDate(),
		dateEnd: dayjs().add(10, 'hour').add(50, 'minute').toDate(),
		title: 'Small quest',
	},
]

export interface Quest {
	dateStart: Date
	dateEnd: Date
	title: string
	link?: string
}

interface QuestsCardProps {
	variant?: 'big' | 'normal' | 'small'
	quest: Quest
}

const QuestCard = ({ variant = 'big', quest }: QuestsCardProps) => {
	const { title, dateStart, dateEnd } = quest

	const { status, isLaunched } = getQuestStatus(dateStart, dateEnd)

	const imgWidth = variant === 'big' ? 124 : 115
	const imgHeight = variant === 'big' ? 163 : 143

	return (
		<a href={quest.link ?? ''}>
			<Card className={`row jsb h-full ${variant === 'small' ? 'ac' : ''}`} key={variant}>
				<div className="jsb h-full gap-md">
					<Tag size="sm" color={isLaunched ? 'blue' : 'pink'}>
						{status}
					</Tag>
					{variant === 'big' ? <h2>{title}</h2> : <h4>{title}</h4>}
				</div>
				{variant === 'small' ? (
					<IconArrowUpRight width={33} height={33} stroke={2} color={'var(--color-primary-650)'} />
				) : (
					<img width={imgWidth} height={imgHeight} src={LifiLogo} alt="Quest image" />
				)}
			</Card>
		</a>
	)
}

export const QuestsCard = () => {
	const { address } = useAccount()
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className="gap-md">
			<div className={classNames.questsHeader}>
				<h4>Quests</h4>
				{address && (
					<Button
						onClick={() => {
							setIsOpen(true)
						}}
						size="xs"
						className="body1"
						variant="black"
					>
						See history
					</Button>
				)}
			</div>
			<QuestCard quest={quests[0]} />
			<div className="row gap-md">
				<QuestCard quest={quests[1]} variant="normal" />
				<div className={classNames.smallCardsContainer}>
					<QuestCard quest={quests[2]} variant="small" />
					<QuestCard quest={quests[3]} variant="small" />
				</div>
			</div>

			<UserHistory isOpen={isOpen} setIsOpen={setIsOpen} />
		</div>
	)
}
