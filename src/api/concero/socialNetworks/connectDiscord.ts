import axios from 'axios'
import { updateUser } from '../user/updateUser'
import { type IUser } from '../user/userType'

export const getToken = async (code: string) => {
	const request = await axios({
		url: 'https://discord.com/api/oauth2/token',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		method: 'post',
		data: {
			client_id: process.env.DISCORD_API_KEY,
			client_secret: process.env.DISCORD_API_SECRET_KEY,
			grant_type: 'authorization_code',
			code,
			redirect_uri: process.env.DISCORD_CALLBACK_URL, // TODO: change real link
		},
	})

	return request.data.access_token
}

export const connectDiscord = async (code: string, user: IUser) => {
	const token = await getToken(code)
	const userData = await axios({
		url: 'https://discord.com/api/users/@me',
		headers: {
			Authorization: `Bearer ${token}`,
		},
		method: 'get',
	})

	if (userData) {
		const { id, username, email, avatar, locale } = userData.data

		await updateUser(user._id, {
			points: user.points + 5,
			subscriptions: {
				discord: {
					id,
					avatar,
					username,
					email,
					locale,
				},
				twitter: user?.subscriptions?.twitter || null,
			},
		})

		return username
	}
}
