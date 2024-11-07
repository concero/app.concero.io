import { config } from '../../constants/config'
import { type UserTransaction } from '../../components/pool/UserActions/UserActions'
import { get } from '../client'

export async function fetchParentPoolActionsByLpAddress(lpAddress: string): Promise<UserTransaction[] | []> {
	try {
		const url = config.baseURL + `/userParentPoolActions?lpAddress=${lpAddress}`
		const response = await get(url)

		if (!response.data.success) {
			return []
		}

		return response.data.data
	} catch (error) {
		console.error('Failed to fetch parent pool actions by lp address:', error)
		return []
	}
}
