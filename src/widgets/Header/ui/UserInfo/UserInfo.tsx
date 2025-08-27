import clsx from 'clsx'
import { useAccount } from 'wagmi'
import { Tag } from '@concero/ui-kit'
import { WalletButton, ProfileButton } from '@/features/Auth'
import { useGetLeaderboard } from '@/entities/User'
import { useUserByAddress } from '@/entities/User'
import { HStack, VStack } from '@/shared/ui/Stack'
import CersIcon from '@/shared/assets/icons/CersIcon.svg?react'
import cls from './UserInfo.module.pcss'
import { TooltipWrapper } from '@/shared/ui/TooltipWrapper/TooltipWrapper'
import { Text } from '@/shared/ui'
import { UserMultipliers } from '../UserMultipliers/UserMultipliers'
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery'

type TProps = {
	shortView?: boolean
}

export const UserInfo = (props: TProps) => {
	const { shortView } = props
	const { address } = useAccount()
	const isTabletOrLess = useMediaQuery('tablet', 'down')
	const { data: userResponse } = useUserByAddress(address)
	const user = userResponse?.payload
	const { data: leaderList } = useGetLeaderboard(address)
	const userRank =
		leaderList?.users && address
			? (leaderList.users.find(user => user.address.toLowerCase() === address.toLowerCase())?.rank ?? null)
			: null
	const isUserTop1K = userRank ?? Infinity < 1000
	const userRankToShow = userRank ? (userRank > 1000 ? '1K+' : userRank) : '...'

	if (!user) {
		return <WalletButton />
	}
	const summaryMultiplier =
		(user.multiplier.base || 0) + (user.multiplier.daily_swaps || 0) + (user.multiplier.liquidity_pool || 0)
	const titleLeaderRank = 'Your leaderboard rank'
	const descriptionLeaderRank = 'Climb the ranks to boost your airdrop!'
	return (
		<HStack gap="space_0_5">
			<HStack gap="space_0_25">
				<span className={cls.points}>{user.points}</span>
				<Tag variant="branded" className={clsx(cls.gradient, cls.cers_icon)}>
					<CersIcon width={'24px'} height={'24px'} />
				</Tag>
				{/* <Tag variant="branded" size="m" className={clsx(cls.gradient)}>
					{summaryMultiplier}x
				</Tag> */}

				<TooltipWrapper
					tooltipId={'user-multiplier'}
					place={isTabletOrLess ? 'top-end' : 'top'}
					tooltipContent={<UserMultipliers user={user} />}
				>
					<Tag variant="branded" size="m" className={clsx(cls.gradient)}>
						{summaryMultiplier}x
					</Tag>
				</TooltipWrapper>
			</HStack>
			<div className={cls.splitter}></div>
			<HStack gap="space_0_5">
				{!shortView && (
					<TooltipWrapper
						place={'bottom'}
						tooltipId={titleLeaderRank}
						tooltipContent={
							<VStack>
								<Text variant="heading_medium" className={cls.title_tooltip_leader_rank}>
									{titleLeaderRank}
								</Text>
								<Text variant="body_medium" className={cls.description_tooltip_leader_rank}>
									{descriptionLeaderRank}
								</Text>
							</VStack>
						}
					>
						<Tag
							variant="neutral"
							size="m"
							className={clsx(cls.leader_rank, { [cls.top_user]: isUserTop1K })}
						>
							<span>#</span>
							<span>{userRankToShow}</span>
						</Tag>
					</TooltipWrapper>
				)}
				<ProfileButton address={user.address} nickname={user.nickname} shortView={shortView} />
			</HStack>
			<div className={cls.splitter}></div>
		</HStack>
	)
}
