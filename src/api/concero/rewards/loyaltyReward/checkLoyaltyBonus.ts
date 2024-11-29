import { get } from '../../../client'

export const checkLoyaltyBonus = async (address: string): Promise<boolean> => {
	const url = `${process.env.CONCERO_API_URL}/rewards/checkLoyaltyBonus/${address}`

	const response = await get(url)
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data.data
}
