import { get } from '../../client'

export const getLpProvidersCount = async (): Promise<number> => {
	const url = `${process.env.CONCERO_API_URL}/lp_providers_count`

	const response = await get(url)
	if (response.status !== 200) throw new Error('no last fee found')
	return response.data.data
}
