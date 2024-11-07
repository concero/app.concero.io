import { get } from '../../client'
import { type Fee } from '../types'

export const fetchFees = async (startTime?: number | null, endTime?: number | null): Promise<Fee[]> => {
	const filter = startTime && endTime ? `?startTime=${startTime}&endTime=${endTime}` : ''

	const url = `${process.env.CONCERO_API_URL}/bridgeFees${filter}`

	const response = await get(url)
	if (response.status !== 200) throw new Error('no fees found')
	return response.data.data
}
