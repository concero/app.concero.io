import { TUserResponse } from '@/entities/User'
import { updateUserDiscord } from '../user/updateUser'
/**@deprecated */
export const connectDiscord = async (code: string, user: TUserResponse): Promise<string> => {
	const response = await updateUserDiscord({
		_id: user._id,
		code,
	})

	return response.username
}
