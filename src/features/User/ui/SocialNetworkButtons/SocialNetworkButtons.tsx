import { useEffect, useState } from 'react'
import { connectDiscord } from '@/api/concero/socialNetworks/connectDiscord'
import { connectTwitter, getRequestToken } from '@/api/concero/socialNetworks/connectTwitter'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { disconnectNetwork } from '@/api/concero/socialNetworks/disconnectNetwork'
import TwitterIcon from '@/shared/assets/icons/Social_X.svg?react'
import DiscordIcon from '@/shared/assets/icons/social_discord.svg?react'
import { Button, Switch } from '@concero/ui-kit'
import cls from './SocialNetworkButtons.module.pcss'
import { TUserResponse } from '@/entities/User'
import { DISCORD_LINK_AUTH } from '@/entities/User/config/consts/discordLink'

interface Props {
	user: TUserResponse
}

export const SocialNetworkButtons = ({ user }: Props) => {
	const [discordIsConnected, setDiscordIsConnected] = useState<boolean>(false)
	const [twitterIsConnected, setTwitterIsConnected] = useState<boolean>(false)
	const isMobile = useMediaQuery('mobile')

	const handleConnectDiscord = async () => {
		try {
			if (discordIsConnected) {
				const isDisconnected = await disconnectNetwork(user.address, 'discord')
				if (isDisconnected) {
					setDiscordIsConnected(false)
				}
			} else {
				window.location.href = DISCORD_LINK_AUTH
			}
		} catch (err) {
			console.error(err)
		}
	}

	const handleConnectTwitter = async () => {
		try {
			if (twitterIsConnected) {
				const isDisconnected = await disconnectNetwork(user.address, 'twitter')
				if (isDisconnected) {
					setTwitterIsConnected(false)
				}
			} else {
				await getRequestToken()
			}
		} catch (err) {
			console.error(err)
		}
	}

	const listenDiscordConnection = async () => {
		const params = new URL(document.location.href).searchParams
		const discordCode = params.get('code')

		if (discordCode && user) {
			const fetchedNickname = await connectDiscord(discordCode, user)
			setDiscordIsConnected(!!fetchedNickname)
		}
	}

	const listenTwitterConnection = async () => {
		const params = new URL(document.location.href).searchParams
		const twitterCode = params.get('oauth_token')
		const twitterVerifyCode = params.get('oauth_verifier')

		if (twitterCode && twitterVerifyCode && user) {
			const fetchedNickname = await connectTwitter(twitterCode, twitterVerifyCode, user)
			setTwitterIsConnected(!!fetchedNickname)
		}
	}

	useEffect(() => {
		if (user?.connectedSocials?.discord) {
			setDiscordIsConnected(!!user.connectedSocials?.discord?.username)
		} else {
			listenDiscordConnection().then()
		}

		if (user?.connectedSocials?.twitter) {
			setTwitterIsConnected(!!user.connectedSocials?.twitter?.screen_name)
		} else {
			listenTwitterConnection().then()
		}
	}, [user])

	return (
		<div className={cls.socials_wrap}>
			<Button
				as="div"
				leftIcon={<TwitterIcon style={{ height: '100%', width: 'auto' }} />}
				onClick={handleConnectTwitter}
				className={cls.connect_social_btn}
				variant="tetrary"
				isFull
				size={isMobile ? 's' : 'm'}
				rightIcon={<Switch checked={twitterIsConnected} />}
			>
				Twitter
			</Button>
			<Button
				as="div"
				leftIcon={<DiscordIcon color="#1DA1F2" style={{ height: '100%', width: 'auto' }} />}
				onClick={handleConnectDiscord}
				className={cls.connect_social_btn}
				variant="tetrary"
				isFull
				size={isMobile ? 's' : 'm'}
				rightIcon={<Switch checked={discordIsConnected} />}
			>
				Discord
			</Button>
		</div>
	)
}
