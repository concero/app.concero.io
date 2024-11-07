import { get } from '../../client'

export const getLpProvidersCount = async (): Promise<number> => {
	const url = `${process.env.CONCERO_API_URL}/lpProvidersCount`

	const response = await get(url)
	if (response.status !== 200) throw new Error('no last fee found')
	return response.data.data
}
