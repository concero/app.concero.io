import { useEffect, useState } from 'react'
import { DISCORD_LINK_AUTH } from '../../config/consts/discordLink'
import { TUserResponse } from '@/entities/User'
import { useSearchParams } from 'react-router-dom'
import { useConnectDiscordMutation, useDisconnectSocialNetworkMutation } from '../../api/userApi'
import { useNavigate } from 'react-router-dom'

type TUseDiscordConnectionProps = {
	user?: TUserResponse
}

export const useDiscordConnection = ({ user }: TUseDiscordConnectionProps) => {
	const [isConnected, setIsConnected] = useState<boolean>(false)
	const [searchParams] = useSearchParams()
	const { mutateAsync } = useConnectDiscordMutation()
	const { mutateAsync: disconnectSocial } = useDisconnectSocialNetworkMutation(user?.address)
	const navigate = useNavigate()
	useEffect(() => {
		if (user?.connectedSocials?.discord?.username) {
			setIsConnected(true)
		} else if (
			!user ||
			!user.connectedSocials ||
			!user.connectedSocials.discord ||
			!user.connectedSocials.discord.username
		) {
			setIsConnected(false)
		}
	}, [user])

	const toggleDiscordConnection = async () => {
		try {
			if (isConnected && user) {
				const isDisconnected = await disconnectSocial({ network: 'discord' })
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
			if (fetchedNickname) {
				navigate('/profile')
			}
		}
	}

	useEffect(() => {
		if (!user?.connectedSocials?.discord?.username) {
			listenDiscordConnection()
		}
	}, [])

	return { isConnected, toggleDiscordConnection }
}
