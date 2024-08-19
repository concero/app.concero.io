import type { IUser } from './userType'
import { get } from '../../client'

export interface FetchUserResponse {
	users: IUser[]
	currentUserPosition: number
}

export const fetchLeaderboard = async (userAddress: string | undefined): Promise<FetchUserResponse> => {
	const userAddressQuery = userAddress ? `userAddress=${userAddress}` : ''
	const url = `${process.env.CONCERO_API_URL}/users?${userAddressQuery}`

	const response = await get(url)
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data.data
}
