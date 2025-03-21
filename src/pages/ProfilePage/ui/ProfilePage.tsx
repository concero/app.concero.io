import { TUserResponse } from '@/entities/User'
import cls from './ProfilePage.module.pcss'
import { truncateWallet } from '@/utils/formatting'
import { useAccount } from 'wagmi'
import { LoginRequired } from '@/features/Auth'
import { Avatar } from '@/shared/ui/Avatar/Avatar'
import { CersLeaderboard } from '@/features/User'
import { PageWrap } from '@/shared/ui/PageWrap/PageWrap'
import DiscordConnectedIcon from '@/shared/assets/icons/social_discord.svg?react'
import DiscordDisconnectedIcon from '@/shared/assets/icons/social_discord_disabled.svg?react'
import TwitterConnectedIcon from '@/shared/assets/icons/Social_X.svg?react'
import TwitterDisconnectedIcon from '@/shared/assets/icons/Social_X_disabled.svg?react'
import Social_Email_Icon from '@/shared/assets/icons/Email_disabled.svg?react'
import { Address } from 'viem'
import { AchievementGroupPreview } from '@/entities/Achievement'
import { Separator } from '@/components/layout/Separator/Separator'
import { OpenHistoryUserActions } from '@/features/User'
import { AccoutSettings } from '@/features/User'
import { useDiscordConnection } from '@/features/User/model/hooks/useDiscordConnection'
import { useTwitterConnection } from '@/features/User/model/hooks/useTwitterConnection'
type TProps = {
	user: TUserResponse | null
}
export const ProfilePage = (props: TProps) => {
	const { user } = props
	const { isConnected } = useAccount()
	const { isConnected: isDiscordConnected } = useDiscordConnection({ user: user ?? undefined })
	const { isConnected: isTwitterConnected } = useTwitterConnection({ user: user ?? undefined })
	if (!isConnected) {
		return <LoginRequired />
	}
	if (!user) return null

	const addresToShow = truncateWallet(user.address, 4)
	const Social_X_toShow = user.connectedSocials.twitter?.screen_name ?? '-'
	const Social_Discord_toShow = user.connectedSocials.discord?.username ?? '-'
	return (
		<PageWrap className={cls.container}>
			<div className={cls.profile_card_wrap}>
				<div className={cls.profile_header}>
					<div className={cls.roles}></div>
					<div className={cls.setting_wrap}>
						<OpenHistoryUserActions
							text="History"
							user={user}
							buttonProps={{
								size: 's',
								variant: 'secondary',
							}}
							className={cls.open_history_btn}
						/>
						<AccoutSettings user={user} />
					</div>
				</div>
				<div className={cls.user_info}>
					<div className={cls.account_info}>
						<Avatar address={user.address as Address} />
						<span className={cls.nickname}>{user.nickname ?? 'Nickname'}</span>
						<span className={cls.address}>{addresToShow}</span>
					</div>
					<div className={cls.socials_group}>
						<div className={cls.social_item}>
							{isTwitterConnected ? <TwitterConnectedIcon /> : <TwitterDisconnectedIcon />}
							<span>{Social_X_toShow}</span>
						</div>
						<div className={cls.social_item}>
							{isDiscordConnected ? <DiscordConnectedIcon /> : <DiscordDisconnectedIcon />}
							<span>{Social_Discord_toShow}</span>
						</div>
						<div className={cls.social_item}>
							<Social_Email_Icon />
							<span>-</span>
						</div>
					</div>
				</div>
				<Separator />
				<div className={cls.achiev_wrap}>
					<AchievementGroupPreview />
				</div>
			</div>
			<CersLeaderboard user={user} />
		</PageWrap>
	)
}
