import { updateUserDiscord } from '../user/updateUser'
import { type IUser } from '../user/userType'

export const connectDiscord = async (code: string, user: IUser): Promise<string> => {
	const response = await updateUserDiscord({
		_id: user._id,
		token: code,
	})

	return response.username
}
