import { get } from '../../../client'

export const checkBTC100KBonus = async (address: string): Promise<boolean> => {
	const url = `${process.env.CONCERO_API_URL}/rewards/checkBTC100KBonus/${address}`
	const response = await get(url)
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data.data
}
