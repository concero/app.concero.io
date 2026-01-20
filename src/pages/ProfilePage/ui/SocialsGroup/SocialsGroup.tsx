import DiscordConnectedIcon from '@/shared/assets/icons/social_discord.svg?react'
import DiscordDisconnectedIcon from '@/shared/assets/icons/social_discord_disabled.svg?react'
import TwitterConnectedIcon from '@/shared/assets/icons/Social_X.svg?react'
import TwitterDisconnectedIcon from '@/shared/assets/icons/Social_X_disabled.svg?react'
import EmailDisconnectedIcon from '@/shared/assets/icons/Email_disabled.svg?react'
import EmailConnectedIcon from '@/shared/assets/icons/Email_connected.svg?react'
import { TUserResponse, useDiscordConnection, UserSocialType, useSocials, useTwitterConnection } from '@/entities/User'
import { memo } from 'react'
import cls from '../ProfilePage.module.pcss'

export const SocialsGroup = memo(
	({ user }: { user: TUserResponse }) => {
		const { data: socialsResponse } = useSocials(user.address)
		const { isConnected: isDiscordConnected } = useDiscordConnection({ user })
		const { isConnected: isTwitterConnected } = useTwitterConnection({ user })
		const IsEmailConnected = user?.email && user.email.length > 0

		const socials = socialsResponse?.payload?.socials
		const socialX = socials ? socials.find(social => social.type === UserSocialType.X) : null
		const socialDiscord = socials ? socials.find(social => social.type === UserSocialType.Discord) : null

		const Social_X_toShow = socialX?.shortname ?? '-'
		const Social_Discord_toShow = socialDiscord?.shortname ?? '-'
		const Social_Email_toShow = user.email ?? '-'
		return (
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
		)
	},
	(oldProps, newProps) => oldProps?.user?.id === newProps?.user?.id,
)
