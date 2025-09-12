import { useEffect, useState } from 'react'
import { DISCORD_LINK_AUTH } from '../../config/consts/discordLink'
import { TUserResponse } from '@/entities/User'
import { useSearchParams } from 'react-router-dom'
import { useConnectDiscordMutation, useDisconnectSocialNetworkMutation, useSocials } from '../../api/userApi'
import { useNavigate } from 'react-router-dom'
import { UserSocialType } from '../validations/validations'

type TUseDiscordConnectionProps = {
	user?: TUserResponse
}

export const useDiscordConnection = ({ user }: TUseDiscordConnectionProps) => {
	const [isConnected, setIsConnected] = useState<boolean>(false)
	const [searchParams] = useSearchParams()
	const { mutateAsync } = useConnectDiscordMutation()
	const { mutateAsync: disconnectSocial } = useDisconnectSocialNetworkMutation(user?.address)
	const { data: socialsResponse } = useSocials(user?.address)
	const navigate = useNavigate()
	useEffect(() => {
		if (
			socialsResponse?.payload &&
			socialsResponse.payload.socials.find(social => social.type === UserSocialType.Discord)
		) {
			setIsConnected(true)
		} else {
			setIsConnected(false)
		}
	}, [socialsResponse])

	const toggleDiscordConnection = async () => {
		try {
			if (isConnected && user) {
				const isDisconnected = await disconnectSocial({ network: UserSocialType.Discord })
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
			const { payload } = await mutateAsync({ token: code, address: user.address })
			setIsConnected(!!payload?.username)
			navigate('/profile')
		}
	}

	useEffect(() => {
		if (
			!socialsResponse?.payload ||
			socialsResponse.payload.socials.find(social => social.type === UserSocialType.Discord)
		) {
			listenDiscordConnection()
		}
	}, [])

	return { isConnected, toggleDiscordConnection }
}
