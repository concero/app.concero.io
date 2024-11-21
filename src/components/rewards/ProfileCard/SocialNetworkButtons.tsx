import type { IUser } from '../../../api/concero/user/userType'
import { useEffect, useState } from 'react'
import { connectDiscord } from '../../../api/concero/socialNetworks/connectDiscord'
import { connectTwitter, getRequestToken } from '../../../api/concero/socialNetworks/connectTwitter'
import { Switch } from '../../layout/Switch/Switch'
import classNames from './ProfileCard.module.pcss'

export const discordLink = `https://discord.com/oauth2/authorize?client_id=1267215033025429595&response_type=code&redirect_uri=https%3A%2F%2Fapp.concero.io%2Frewards&scope=identify+guilds+email`

interface Props {
	user: IUser | null | undefined
}

export const SocialNetworkButtons = ({ user }: Props) => {
	const [discordIsConncected, setDiscordIsConnected] = useState<boolean>(false)
	const [twitterIsConnected, setTwitterIsConnected] = useState<boolean>(false)

	const handleConnectDiscord = async () => {
		const params = new URL(document.location.href).searchParams
		const discordCode = params.get('code')

		if (discordCode && user) {
			const fetchedNickname = await connectDiscord(discordCode, user)
			setDiscordIsConnected(!!fetchedNickname)
		}
	}

	const handleConnectTwitter = async () => {
		const params = new URL(document.location.href).searchParams
		const twitterCode = params.get('oauth_token')
		const twitterVerifyCode = params.get('oauth_verifier')

		if (twitterCode && twitterVerifyCode && user) {
			const fetchedNickname = await connectTwitter(twitterCode, twitterVerifyCode, user)
			setTwitterIsConnected(!!fetchedNickname)
		}
	}

	useEffect(() => {
		if (user?.subscriptions?.discord) {
			setDiscordIsConnected(!!user.subscriptions?.discord?.username)
		} else {
			void handleConnectDiscord()
		}

		if (user?.subscriptions?.twitter) {
			setTwitterIsConnected(!!user.subscriptions?.twitter?.screen_name)
		} else {
			void handleConnectTwitter()
		}
	}, [user])

	return (
		<>
			<a
				className={classNames.connectSocialNetworkButton}
				style={{ marginLeft: '-5px' }}
				onClick={getRequestToken}
			>
				<h6>Twitter</h6>
				<Switch active={twitterIsConnected} />
			</a>
			<a className={classNames.connectSocialNetworkButton} style={{ marginLeft: '-5px' }} href={discordLink}>
				<h6>Discord</h6>
				<Switch active={discordIsConncected} />
			</a>
		</>
	)
}
