import { get } from '../client'

export async function fetchProtocolDataById(protocolId: string) {
	const url = `${process.env.CONCERO_API_URL}/protocols?_id=${protocolId}&limit=15&offset=0`
	const response = await get(url)
	return response.data.data
}
