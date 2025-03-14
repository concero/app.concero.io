import { useAccount } from 'wagmi'
import { TQuestTag, useQuests, useTestingQuests } from '@/entities/Quest'
import { useUserByAddress } from '@/entities/User'
import cls from './QuestPreviewList.module.pcss'
import { QuestPreviewItem } from '../QuestPreviewItem/QuestPreviewItem'
import TestingPortalIcon from '@/shared/assets/icons/testing_portal_rocketsvg.svg?react'
import { useState } from 'react'
import { Button } from '@concero/ui-kit'

export const QuestPreviewList = (): JSX.Element => {
	const { data: quests } = useQuests()
	const { data: testingQuests } = useTestingQuests()
	const account = useAccount()
	const { data: user } = useUserByAddress(account.address)
	let isAdmin = [
		'0xffb54219e8e4b0e08e5fa503edc1cf3080f73869'.toLowerCase(),
		'0x5B694fF6592F77958621595F94bFFa05aC0724A1'.toLowerCase(),
		'0x5040C7AC5D4b2E13b01e0d045f8b4eF37CA4Dea6'.toLowerCase(),
	].includes(account.address?.toLowerCase() ?? '')
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
