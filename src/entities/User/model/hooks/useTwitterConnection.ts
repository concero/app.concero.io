import { useEffect, useState } from 'react'
import { socialsService, TUserResponse, useDisconnectSocialNetworkMutation } from '@/entities/User'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useConnectTwitterMutation } from '../../api/userApi'

interface UseTwitterConnectionProps {
	user?: TUserResponse
}

export const useTwitterConnection = ({ user }: UseTwitterConnectionProps) => {
	const [isConnected, setIsConnected] = useState<boolean>(false)
	const [searchParams] = useSearchParams()
	const { mutateAsync } = useConnectTwitterMutation()
	const { mutateAsync: disconnectSocial } = useDisconnectSocialNetworkMutation(user?.address)
	const navigate = useNavigate()
	useEffect(() => {
		if (user?.connectedSocials?.twitter?.name) {
			setIsConnected(true)
		} else if (
			!user ||
			!user.connectedSocials ||
			!user.connectedSocials.twitter ||
			!user.connectedSocials.twitter.name
		) {
			setIsConnected(false)
		}
	}, [user])

	const toggleTwitterConnection = async () => {
		try {
			if (isConnected && user) {
				const isDisconnected = await disconnectSocial({ network: 'twitter' })
				if (isDisconnected) {
					setIsConnected(false)
				}
			} else {
				await socialsService.getRequestToken()
			}
		} catch (err) {
			console.error(err)
		}
	}

	const listenTwitterConnection = async () => {
		const twitterCode = searchParams.get('oauth_token')
		const twitterVerifyCode = searchParams.get('oauth_verifier')

		if (twitterCode && twitterVerifyCode && user) {
			const result = await mutateAsync({
				oauthToken: twitterCode,
				twitterVerifyCode: twitterVerifyCode,
				user,
			})
			setIsConnected(!!result.success)
			if (result.username) {
				navigate('/profile')
			}
		}
	}

	useEffect(() => {
		if (!user?.connectedSocials?.twitter?.screen_name) {
			listenTwitterConnection().then()
		} else if (searchParams.get('oauth_token') || searchParams.get('oauth_verifier')) {
			navigate('/profile')
		}
	}, [])

	return { isConnected, toggleTwitterConnection }
}
