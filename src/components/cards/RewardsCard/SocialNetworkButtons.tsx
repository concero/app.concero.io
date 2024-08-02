import classNames from './RewardsCard.module.pcss'
import type { IUser } from '../../../api/concero/userType'
import { useEffect, useState } from 'react'
import { connectDiscord } from '../../../api/concero/socialNetworks/connectDiscord'
import { connectTwitter, getRequestToken } from '../../../api/concero/socialNetworks/connectTwitter'

const discordLink =
	'https://discord.com/oauth2/authorize?client_id=1267215033025429595&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Frewards&scope=identify+guilds+email+guilds.join+connections+guilds.members.read+gdm.join+role_connections.write'

interface Props {
	user: IUser | null | undefined
}

export const SocialNetworkButtons = ({ user }: Props) => {
	const [discordNickname, setDiscordNickname] = useState<string | null>('')
	const [twitterNickname, setTwitterNickname] = useState<string | null>('')

	const handleConnectDiscord = async () => {
		const params = new URL(document.location.href).searchParams
		const discordCode = params.get('code')

		if (discordCode && user && !user.subscriptions.discord?.username) {
			const fetchedNickname = await connectDiscord(discordCode, user)
			setDiscordNickname(fetchedNickname)
		}
	}

	const handleConnectTwitter = async () => {
		const params = new URL(document.location.href).searchParams
		const twitterCode = params.get('oauth_token')
		const twitterVerifyCode = params.get('oauth_token_secret')

		if (twitterCode && twitterVerifyCode && user && !user.subscriptions.twitter?.username) {
			const fetchedNickname = await connectTwitter(twitterCode, twitterVerifyCode, user)
			setDiscordNickname(fetchedNickname)
		}
	}

	useEffect(() => {
		if (user?.subscriptions?.discord) {
			setDiscordNickname(user.subscriptions?.discord?.username)
		} else {
			void handleConnectDiscord()
		}

		if (user?.subscriptions?.twitter) {
			setTwitterNickname(user.subscriptions?.twitter?.username)
		} else {
			void handleConnectTwitter()
		}
	}, [user])

	const discordConnected = user?.subscriptions?.discord ? classNames.socialNetworkConnected : ''
	const twitterConnected = user?.subscriptions?.twitter ? classNames.socialNetworkConnected : ''
	const buttonDisabled = !user ? classNames.connectSocialNetworkButtonDisabled : ''

	return (
		<div className="row gap-md">
			<a
				href={discordLink}
				className={`${classNames.connectSocialNetworkButton} ${discordConnected} ${buttonDisabled}`}
			>
				<h4>{discordNickname || 'Connect Discord'}</h4>
				<span className="body1">+5 points {discordNickname ? 'claimed' : ''}</span>
			</a>
			<a
				onClick={getRequestToken}
				className={`${classNames.connectSocialNetworkButton} ${twitterConnected} ${buttonDisabled}`}
			>
				<h4>{twitterNickname || 'Connect Twitter'}</h4>
				<span className="body1">+5 points {twitterNickname ? 'claimed' : ''}</span>
			</a>
		</div>
	)
}
