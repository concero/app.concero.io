import { get } from '../../client'
import { config } from '../../../constants/config'
import { updateUserTwitter } from '../user/updateUser'
import { TUserResponse } from '@/entities/User'
/**@deprecated */
export const getRequestToken = async () => {
	const request = await get(`${config.baseURL}/twitterToken`)
	const link = request.data.data

	window.location.href = link
}

export const connectTwitter = async (oauthToken: string, twitterVerifyCode: string, user: TUserResponse) => {
	return (await updateUserTwitter({ _id: user._id, token: oauthToken, verifier: twitterVerifyCode })).screen_name
}
