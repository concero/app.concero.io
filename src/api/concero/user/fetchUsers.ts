import type { IUser } from './userType'
import { get } from '../../client'

export interface FetchUserResponse {
	users: IUser[]
	currentUserPosition: number
}

export const fetchUsers = async (userPoints: number | null | undefined): Promise<FetchUserResponse> => {
	const userPointsQuery = userPoints !== null || userPoints !== undefined ? `userPoints=${userPoints}` : null
	const url = `${process.env.CONCERO_API_URL}/users?${userPointsQuery}`

	const response = await get(url)
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data.data
}
