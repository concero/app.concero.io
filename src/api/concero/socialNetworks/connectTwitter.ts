import { type IUser } from '../user/userType'
import { get } from '../../client'
import { config } from '../../../constants/config'
import { updateUserTwitter } from '../user/updateUser'

export const getRequestToken = async () => {
	const request = await get(`${config.baseURL}/twitter_token`)
	const link = request.data.data

	window.location.href = link
}

const getUserData = async (oauthToken: string, oauthVerifier: string) => {
	const { data } = await get(`${config.baseURL}/twitter_auth?oauthToken=${oauthToken}&oauthVerifier=${oauthVerifier}`)
	return data
}

export const connectTwitter = async (oauthToken: string, oauthVerifier: string, user: IUser) => {
	const { data } = await getUserData(oauthToken, oauthVerifier)

	const { screen_name } = data

	await updateUserTwitter({ _id: user._id, token: oauthToken })

	// await updateUser(user._id, {
	// 	points: user.points + 5,
	// 	subscriptions: {
	// 		twitter: {
	// 			id,
	// 			screen_name,
	// 			name,
	// 		},
	// 		discord: user?.subscriptions?.discord || null,
	// 	},
	// })

	return data.screen_name
}
