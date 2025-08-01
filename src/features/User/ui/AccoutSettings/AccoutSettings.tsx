import { useState } from 'react'
import { Address } from 'viem'
import { Button } from '@concero/ui-kit'
import {
	AccoutSettingsModal,
	TUserResponse,
	DisconnectSocialsModal,
	useDiscordConnection,
	useTwitterConnection,
	useDisconnectEmailMutation,
	useSocials,
	UserSocialType,
} from '@/entities/User'
import { NicknameConnect } from '../NicknameConnect/NicknameConnect'
import DiscordConnectedIcon from '@/shared/assets/icons/social_discord.svg?react'
import DiscordDisconnectedIcon from '@/shared/assets/icons/social_discord_disabled.svg?react'
import TwitterConnectedIcon from '@/shared/assets/icons/Social_X.svg?react'
import TwitterDisconnectedIcon from '@/shared/assets/icons/Social_X_disabled.svg?react'
import EmailDiconnectedIconIcon from '@/shared/assets/icons/Email_disabled.svg?react'
import EmailConnectedIconIcon from '@/shared/assets/icons/Email_connected.svg?react'
import cls from './AccoutSettings.module.pcss'
import { EmailConnectModal } from '../EmailConnectModal/EmailConnectModal'
import { isAdminAddress } from '@/shared/lib/tests/isAdminAddress'
type TProps = {
	user: TUserResponse
}

export const AccoutSettings = ({ user }: TProps) => {
	const { isConnected: isDiscordConnected, toggleDiscordConnection } = useDiscordConnection({ user })
	const { isConnected: isTwitterConnected, toggleTwitterConnection } = useTwitterConnection({ user })
	const [showEmailModal, setShowEmailModal] = useState<boolean>(false)
	const IsEmailConnected = user.email && user.email.length > 0
	const { mutateAsync: disconnectNetwork } = useDisconnectEmailMutation()
	const [showDisconnect, setShowDisconnect] = useState(false)
	const [currentSocial, setCurrentSocial] = useState<'discord' | 'twitter' | 'email'>()
	const handleOpenWarningDisconnect = () => {
		setShowDisconnect(true)
	}
	const { data: socials } = useSocials(user.address)
	const socialX = socials?.find(social => social.type === UserSocialType.X)
	const socialDiscord = socials?.find(social => social.type === UserSocialType.Discord)
	const isAdmin = isAdminAddress(user.address)

	const handleDisconnect = () => {
		switch (currentSocial) {
			case 'discord':
				if (isDiscordConnected) {
					toggleDiscordConnection()
				}
				break
			case 'twitter':
				if (isTwitterConnected) {
					toggleTwitterConnection()
				}
				break
			case 'email':
				if (IsEmailConnected) {
					disconnectNetwork({ address: user.address as Address })
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
							{isDiscordConnected ? socialDiscord?.name : 'Discord'}
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
							{isTwitterConnected ? socialX?.name : 'X'}
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
				EmailConnect={
					isAdmin ? (
						<div className={cls.social_wrap}>
							<div className={cls.social_header}>
								{IsEmailConnected ? <EmailConnectedIconIcon /> : <EmailDiconnectedIconIcon />}
								{IsEmailConnected ? user.email : 'Email'}
							</div>
							{IsEmailConnected ? (
								<Button
									variant="secondary"
									size="s"
									onClick={() => {
										setCurrentSocial('email')
										handleOpenWarningDisconnect()
									}}
								>
									Disconnect
								</Button>
							) : (
								<Button variant="secondary_color" size="s" onClick={() => setShowEmailModal(true)}>
									Connect
								</Button>
							)}
						</div>
					) : null
				}
			/>
			<EmailConnectModal user={user} show={showEmailModal} onClose={() => setShowEmailModal(false)} />
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
