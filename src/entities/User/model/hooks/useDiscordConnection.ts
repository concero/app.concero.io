import { useEffect, useState } from 'react'
import { DISCORD_LINK_AUTH } from '../../config/consts/discordLink'
import { TUserResponse } from '@/entities/User'
import { socialsService } from '@/entities/User'

type TUseDiscordConnectionProps = {
	user?: TUserResponse
}

export const useDiscordConnection = ({ user }: TUseDiscordConnectionProps) => {
	const [isConnected, setIsConnected] = useState<boolean>(false)

	useEffect(() => {
		if (user?.connectedSocials?.discord?.username) {
			setIsConnected(true)
		}
	}, [user])

	const toggleDiscordConnection = async () => {
		try {
			if (isConnected && user) {
				const isDisconnected = await socialsService.disconnectNetwork(user.address, 'discord')
				if (isDisconnected) {
					setIsConnected(false)
				}
			} else {
				window.location.href = DISCORD_LINK_AUTH
			}
		} catch (err) {
			console.error(err)
		}
	}

	const listenDiscordConnection = async () => {
		const params = new URL(document.location.href).searchParams
		const discordCode = params.get('code')

		if (discordCode && user) {
			const fetchedNickname = await socialsService.connectDiscord(discordCode, user)
			setIsConnected(!!fetchedNickname)
		}
	}

	useEffect(() => {
		if (!user?.connectedSocials?.discord?.username) {
			listenDiscordConnection().then()
		}
	}, [])

	return { isConnected, toggleDiscordConnection }
}
