import { get } from '../../client'
import { config } from '../../../constants/config'

export const getDiscordRole = async (userId: string) => {
	return await get(`${config.baseURL}/get_discord_roles/${userId}`)
}
