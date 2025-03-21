import { Button } from '@concero/ui-kit'
import {
	AccoutSettingsModal,
	TUserResponse,
	DisconnectSocialsModal,
	useDiscordConnection,
	useTwitterConnection,
} from '@/entities/User'
import { NicknameConnect } from '../NicknameConnect/NicknameConnect'
import DiscordConnectedIcon from '@/shared/assets/icons/social_discord.svg?react'
import DiscordDisconnectedIcon from '@/shared/assets/icons/social_discord_disabled.svg?react'
import TwitterConnectedIcon from '@/shared/assets/icons/Social_X.svg?react'
import TwitterDisconnectedIcon from '@/shared/assets/icons/Social_X_disabled.svg?react'
import cls from './AccoutSettings.module.pcss'
import { useState } from 'react'
type TProps = {
	user: TUserResponse
}

export const AccoutSettings = ({ user }: TProps) => {
	const { isConnected: isDiscordConnected, toggleDiscordConnection } = useDiscordConnection({ user })
	const { isConnected: isTwitterConnected, toggleTwitterConnection } = useTwitterConnection({ user })
	const [showDisconnect, setShowDisconnect] = useState(false)
	const [currentSocial, setCurrentSocial] = useState<'discord' | 'twitter'>()
	const handleOpenWarningDisconnect = () => {
		setShowDisconnect(true)
	}

	const handleDisconnect = () => {
		switch (currentSocial) {
			case 'discord':
				if (isDiscordConnected) {
					toggleDiscordConnection()
				}
				break
			case 'twitter':
				console.log('isTwitterConnected:', isTwitterConnected)

				if (isTwitterConnected) {
					toggleTwitterConnection()
				}
				break
		}
		setShowDisconnect(false)
	}
	return (
		<>
			<AccoutSettingsModal
				NicknameConnect={<NicknameConnect user={user} />}
				DiscordConnect={
					<div className={cls.social_wrap}>
						<div className={cls.social_header}>
							{isDiscordConnected ? <DiscordConnectedIcon /> : <DiscordDisconnectedIcon />}
							{isDiscordConnected ? user.connectedSocials.discord?.username : 'Discord'}
						</div>
						{isDiscordConnected ? (
							<Button
								variant="secondary"
								size="s"
								onClick={() => {
									setCurrentSocial('discord')
									handleOpenWarningDisconnect()
								}}
							>
								Disconnect
							</Button>
						) : (
							<Button variant="secondary_color" size="s" onClick={toggleDiscordConnection}>
								Connect
							</Button>
						)}
					</div>
				}
				XConnect={
					<div className={cls.social_wrap}>
						<div className={cls.social_header}>
							{isTwitterConnected ? <TwitterConnectedIcon /> : <TwitterDisconnectedIcon />}
							{isTwitterConnected ? user.connectedSocials.twitter?.name : 'X'}
						</div>
						{isTwitterConnected ? (
							<Button
								variant="secondary"
								size="s"
								onClick={() => {
									setCurrentSocial('twitter')
									handleOpenWarningDisconnect()
								}}
							>
								Disconnect
							</Button>
						) : (
							<Button variant="secondary_color" size="s" onClick={toggleTwitterConnection}>
								Connect
							</Button>
						)}
					</div>
				}
			/>
			<DisconnectSocialsModal
				show={showDisconnect}
				close={() => {
					setShowDisconnect(false)
				}}
				onDisconnect={handleDisconnect}
			/>
		</>
	)
}
