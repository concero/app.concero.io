import { useAccount } from 'wagmi'
import { TQuestTag, useQuests, useTestingQuests } from '@/entities/Quest'
import { useUserByAddress } from '@/entities/User'
import cls from './QuestPreviewList.module.pcss'
import { QuestPreviewItem } from '../QuestPreviewItem/QuestPreviewItem'
import TestingPortalIcon from '@/shared/assets/icons/testing_portal_rocketsvg.svg?react'
import { useState } from 'react'
import { Button } from '@concero/ui-kit'
import { isAdminAddress } from '@/shared/lib/tests/isAdminAddress'

export const QuestPreviewList = (): JSX.Element => {
	const { data: quests } = useQuests()
	const { data: testingQuests } = useTestingQuests()
	const account = useAccount()
	const { data: user } = useUserByAddress(account.address)
	let isAdmin = isAdminAddress(account.address)
	const [viewMode, setViewMode] = useState<TQuestTag>('rewards')

	const handleViewModeChange = (mode: 'rewards' | 'testing') => {
		setViewMode(mode)
	}
	const listQuests = viewMode === 'rewards' ? quests : testingQuests
	return (
		<div className={cls.quest_preview_list}>
			<div className={cls.header_list}>
				<div className={cls.title}>Quests</div>
				{isAdmin && (
					<div className={cls.filters}>
						<Button
							variant={viewMode == 'rewards' ? 'secondary_color' : 'secondary'}
							size="m"
							onClick={() => handleViewModeChange('rewards')}
							className={viewMode == 'rewards' ? cls.selected : ''}
						>
							On Chain
						</Button>
						<Button
							variant={viewMode == 'testing' ? 'secondary_color' : 'secondary'}
							size="m"
							onClick={() => handleViewModeChange('testing')}
							className={viewMode == 'testing' ? cls.selected : ''}
						>
							Testing
						</Button>
					</div>
				)}
			</div>
			{viewMode === 'testing' && isAdmin ? (
				<div className={cls.testing_start_block}>
					<TestingPortalIcon />
					<div className={cls.description_block}>
						<div className={cls.title}>Welcome to the Testing Portal!</div>
						<div className={cls.subtitle}>
							Participate in surveys about products built on our protocol and earn rewards. Your feedback
							improves these products and supports their growth.
						</div>
					</div>
				</div>
			) : null}
			<div className={cls.list}>
				{listQuests?.Monthly ? (
					<div className={cls.monthly}>
						{listQuests.Monthly.map(quest => (
							<QuestPreviewItem quest={quest} user={user} key={quest._id} size="xl" />
						))}
					</div>
				) : null}
				{listQuests?.Primary ? (
					<div className={cls.primary}>
						{listQuests.Primary.map(quest => (
							<QuestPreviewItem quest={quest} user={user} key={quest._id} size="l" />
						))}
					</div>
				) : null}
				{listQuests?.Secondary ? (
					<div className={cls.secondary}>
						{listQuests.Secondary.map(quest => (
							<QuestPreviewItem quest={quest} user={user} key={quest._id} size="m" />
						))}
					</div>
				) : null}
			</div>
		</div>
	)
}
