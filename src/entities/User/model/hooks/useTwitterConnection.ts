import { useEffect, useState } from 'react'
import { socialsService, TUserResponse } from '@/entities/User'

interface UseTwitterConnectionProps {
	user?: TUserResponse
}

export const useTwitterConnection = ({ user }: UseTwitterConnectionProps) => {
	const [isConnected, setIsConnected] = useState<boolean>(false)

	useEffect(() => {
		if (user?.connectedSocials?.twitter?.screen_name) {
			setIsConnected(true)
		}
	}, [user])

	const toggleTwitterConnection = async () => {
		try {
			if (isConnected && user) {
				const isDisconnected = await socialsService.disconnectNetwork(user.address, 'twitter')
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
		const params = new URL(document.location.href).searchParams
		const twitterCode = params.get('oauth_token')
		const twitterVerifyCode = params.get('oauth_verifier')

		if (twitterCode && twitterVerifyCode && user) {
			const fetchedNickname = await socialsService.connectTwitter(twitterCode, twitterVerifyCode, user)
			setIsConnected(!!fetchedNickname)
		}
	}

	useEffect(() => {
		if (!user?.connectedSocials?.twitter?.screen_name) {
			listenTwitterConnection().then()
		}
	}, [])

	return { isConnected, toggleTwitterConnection }
}
