import { get } from '../../client'
import { TUserResponse } from '@/entities/User'

export interface FetchUserResponse {
	users: TUserResponse[]
	currentUserPosition: number
}
/**@deprecated */
export const fetchLeaderboard = async (userAddress: string | undefined): Promise<FetchUserResponse> => {
	const userAddressQuery = userAddress ? `userAddress=${userAddress}` : ''
	const url = `${process.env.CONCERO_API_URL}/usersLeaderboard?${userAddressQuery}`

	const response = await get(url)
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data.data
}
