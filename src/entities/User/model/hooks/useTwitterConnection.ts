import { useEffect, useState } from 'react'
import { socialsService, TUserResponse, useDisconnectSocialNetworkMutation } from '@/entities/User'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useConnectTwitterMutation, useSocials } from '../../api/userApi'
import { UserSocialType } from '../validations/validations'

interface UseTwitterConnectionProps {
	user?: TUserResponse
}

export const useTwitterConnection = ({ user }: UseTwitterConnectionProps) => {
	const [isConnected, setIsConnected] = useState<boolean>(false)
	const [searchParams] = useSearchParams()
	const { mutateAsync } = useConnectTwitterMutation()
	const { mutateAsync: disconnectSocial } = useDisconnectSocialNetworkMutation(user?.address)
	const { data: socials } = useSocials(user?.address)
	const navigate = useNavigate()
	useEffect(() => {
		if (socials && socials.find(social => social.type === UserSocialType.X)) {
			setIsConnected(true)
		}
	}, [user, socials])

	const toggleTwitterConnection = async () => {
		try {
			if (isConnected && user) {
				const isDisconnected = await disconnectSocial({ network: 'twitter' })
				if (isDisconnected) {
					setIsConnected(false)
				}
			} else {
				const link = await socialsService.getRequestToken()
				window.location.href = link
			}
		} catch (err) {
			console.error(err)
		}
	}

	const listenTwitterConnection = async () => {
		const twitterCode = searchParams.get('oauth_token')
		const twitterVerifyCode = searchParams.get('oauth_verifier')

		if (twitterCode && twitterVerifyCode && user) {
			try {
				const result = await mutateAsync({
					oauthToken: twitterCode,
					twitterVerifyCode: twitterVerifyCode,
					userId: user.id,
				})
				setIsConnected(!!result.success)
				if (result.username) {
					navigate('/profile')
				}
			} catch (error) {
				navigate('/profile')
			}
		}
	}

	useEffect(() => {
		if (!socials || socials.find(social => social.type === UserSocialType.X)) {
			listenTwitterConnection().then()
		} else if (searchParams.get('oauth_token') || searchParams.get('oauth_verifier')) {
			navigate('/profile')
		}
	}, [])

	return { isConnected, toggleTwitterConnection }
}
