import { post } from '../../../client'

export const claimChristmasGift = async (address: string): Promise<boolean> => {
	const url = `${process.env.CONCERO_API_URL}/rewards/claimChristmasGift/${address}`

	const response = await post(url, {})
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data.data
}
