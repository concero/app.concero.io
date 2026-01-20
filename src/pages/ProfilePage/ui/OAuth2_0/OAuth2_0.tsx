import { socialsService } from '@/entities/User'
import { Button } from '@concero/ui-kit'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export const OAuth2_0 = ({ address }: { address: string }) => {
	const [searchParams] = useSearchParams()
	const handleClick = () => {
		socialsService.getAuth2_0XLink({ address }).then(response => {
			window.location.href = response.payload.link
		})
	}
	useEffect(() => {
		const code = searchParams.get('code')
		if (!code) {
			console.log('OAuth2_0 | Code is not valid', { code })
			return
		}
		socialsService.getLikedTweets({ code, walletAddress: address }).then(
			res => {
				console.log('getLikedTweets | resolve', { res })
			},
			err => {
				console.log('getLikedTweets | error', { err })
			},
		)
	}, [])
	return <Button onClick={handleClick}>Click to go to X </Button>
}
