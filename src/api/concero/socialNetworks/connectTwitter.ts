import { type IUser } from '../user/userType'
import { get } from '../../client'
import { config } from '../../../constants/config'
import { updateUser } from '../user/updateUser'

export const getRequestToken = async () => {
	const request = await get(`${config.baseURL}/twitter_token`)
	const link = request.data.data

	console.log('twitter_token', link)
	window.location.href = link
}

const getAccessToken = async (oauthToken: string, oauthVerifier: string) => {
	const { data } = await get(`${config.baseURL}/twitter_auth?oauthToken=${oauthToken}&oauthVerifier=${oauthVerifier}`)
	return data
}

export const connectTwitter = async (oauthToken: string, oauthVerifier: string, user: IUser) => {
	const { data } = await getAccessToken(oauthToken, oauthVerifier)

	const { screen_name, name, id } = data

	await updateUser(user._id, {
		points: user.points + 5,
		subscriptions: {
			twitter: {
				id,
				screen_name,
				name,
			},
			discord: user?.subscriptions?.discord || null,
		},
	})

	return data.screen_name
}
