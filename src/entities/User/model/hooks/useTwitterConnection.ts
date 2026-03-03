import { useEffect, useState } from 'react'
import { socialsService, useDisconnectSocialNetworkMutation } from '../../api/userApi'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useConnectXMutation, useSocials } from '../../api/userApi'
import { UserSocialType } from '../validations/validations'
import { Http } from '@/shared/types/api'
import { TUserResponse } from '../types/response'

interface UseTwitterConnectionProps {
	user?: TUserResponse
}

export const useTwitterConnection = ({ user }: UseTwitterConnectionProps) => {
	const [isConnected, setIsConnected] = useState<boolean>(false)
	const [isConnecting, setIsConnecting] = useState<boolean>(false)
	const [searchParams] = useSearchParams()
	const { mutateAsync } = useConnectXMutation()
	const { mutateAsync: disconnectSocial } = useDisconnectSocialNetworkMutation(user?.address)
	const { data: socialsResponse } = useSocials(user?.address)
	const navigate = useNavigate()
	useEffect(() => {
		if (
			socialsResponse?.payload &&
			socialsResponse.payload.socials.find(social => social.type === UserSocialType.X)
		) {
			setIsConnected(true)
		} else {
			setIsConnected(false)
		}
	}, [socialsResponse])

	const toggleTwitterConnection = async () => {
		try {
			if (isConnected && user) {
				const isDisconnected = await disconnectSocial({ network: UserSocialType.X })
				if (isDisconnected) {
					setIsConnected(false)
				}
			} else {
				if (user) {
					const link = await socialsService.getAuthXLink({ address: user.address })

					window.location.href = link.payload.link
				}
			}
		} catch (err) {
			console.error(err)
		}
	}

	const listenTwitterConnection = async () => {
		if (isConnecting) return
		const twitterCode = searchParams.get('oauth_token')
		const twitterVerifyCode = searchParams.get('oauth_verifier')

		setIsConnecting(true)
		try {
			if (!user || !twitterCode || !twitterVerifyCode) return
			const result = await mutateAsync({
				address: user.address,
				token: twitterCode,
				verifier: twitterVerifyCode,
			})
			setIsConnected(result.code === Http.Code.Enum.OK)
			if (result.payload?.username) {
				navigate('/profile')
			}
		} catch (error) {
			console.log('listenTwitterConnection:', { error })
		} finally {
			setIsConnecting(false)
			navigate('/profile')
		}
	}

	useEffect(() => {
		if (
			!socialsResponse?.payload ||
			socialsResponse.payload.socials.find(social => social.type === UserSocialType.X)
		) {
			listenTwitterConnection().catch(err => {
				console.error('useTwitterConnection: err:', err)
			})
		} else if (searchParams.get('oauth_token') || searchParams.get('oauth_verifier')) {
			navigate('/profile')
		}
	}, [])

	return { isConnected, toggleTwitterConnection }
}
