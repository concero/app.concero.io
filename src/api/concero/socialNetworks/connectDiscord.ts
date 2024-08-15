import { updateUserDiscord } from '../user/updateUser'
import { type IUser } from '../user/userType'

export const connectDiscord = async (code: string, user: IUser): Promise<string> => {
	const response = await updateUserDiscord({
		_id: user._id,
		code,
	})

	return response.username
}
