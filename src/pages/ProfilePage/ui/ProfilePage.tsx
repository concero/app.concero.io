import { TUserResponse, useDiscordConnection, useTwitterConnection } from '@/entities/User'
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
import EmailDisconnectedIcon from '@/shared/assets/icons/Email_disabled.svg?react'
import EmailConnectedIcon from '@/shared/assets/icons/Email_connected.svg?react'
import { Address } from 'viem'
import { AchievementGroupPreview } from '@/entities/Achievement'
import { Separator } from '@/components/layout/Separator/Separator'
import { OpenHistoryUserActions } from '@/features/User'
import { AccoutSettings } from '@/features/User'
import { Banners } from '@/entities/Social'
import { useAppKitAccount } from '@reown/appkit/react'
type TProps = {
	user: TUserResponse | null
}
export const ProfilePage = (props: TProps) => {
	const { user } = props
	const { address, isConnected } = useAppKitAccount()
	const { isConnected: isDiscordConnected } = useDiscordConnection({ user: user ?? undefined })
	const { isConnected: isTwitterConnected } = useTwitterConnection({ user: user ?? undefined })
	const IsEmailConnected = user?.email && user.email.length > 0
	if (!isConnected) {
		return <LoginRequired />
	}
	if (!user) return null

	const addresToShow = truncateWallet(user.address, 4)
	const Social_X_toShow = user.connectedSocials?.twitter?.screen_name ?? '-'
	const Social_Discord_toShow = user.connectedSocials?.discord?.username ?? '-'
	const Social_Email_toShow = user.email ?? '-'
	return (
		<PageWrap>
			<Banners />
			<div className={cls.profile_card_wrap}>
				<div className={cls.profile_header}>
					<div className={cls.roles}></div>
					<div className={cls.setting_wrap}>
						{/* <OpenHistoryUserActions
							user={user}
							text="History"
							buttonProps={{
								size: 's',
								variant: 'secondary',
							}}
							className={cls.open_history_btn}
						/> */}
						{/* <AccoutSettings user={user} /> */}
					</div>
				</div>
				<div className={cls.user_info}>
					<div className={cls.account_info}>
						<Avatar address={user.address as Address} />
						<div className={cls.wrap_nick_address}>
							<span className={cls.nickname}>{user.nickname ?? 'Nickname'}</span>
							<span className={cls.address}>{addresToShow}</span>
						</div>
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
							{IsEmailConnected ? <EmailConnectedIcon /> : <EmailDisconnectedIcon />}
							<span>{Social_Email_toShow}</span>
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
