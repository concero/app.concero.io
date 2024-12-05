import { post } from '../../../client'

export const claimBTC100KBonus = async (address: string): Promise<boolean> => {
	const url = `${process.env.CONCERO_API_URL}/rewards/claimBTC100KBonus/${address}`

	const response = await post(url, {})
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data.data
}
