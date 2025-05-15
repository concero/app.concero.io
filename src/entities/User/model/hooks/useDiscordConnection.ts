import { useEffect, useState } from 'react'
import { DISCORD_LINK_AUTH } from '../../config/consts/discordLink'
import { TUserResponse } from '@/entities/User'
import { socialsService } from '@/entities/User'
import { useSearchParams } from 'react-router-dom'
import { useConnectDiscordMutation } from '../../api/userApi'

type TUseDiscordConnectionProps = {
	user?: TUserResponse
}

export const useDiscordConnection = ({ user }: TUseDiscordConnectionProps) => {
	const [isConnected, setIsConnected] = useState<boolean>(false)
	const [searchParams] = useSearchParams()
	const { mutateAsync } = useConnectDiscordMutation()
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
		const code = searchParams.get('code')

		if (code && user) {
			const fetchedNickname = await mutateAsync({ code, userId: user._id })
			setIsConnected(!!fetchedNickname)
		}
	}

	useEffect(() => {
		if (!user?.connectedSocials?.discord?.username) {
			listenDiscordConnection()
		}
	}, [])

	return { isConnected, toggleDiscordConnection }
}
