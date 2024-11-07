import { get } from '../client'

export const fetchTransactionsCount = async (): Promise<number> => {
	const url = `${process.env.CONCERO_API_URL}/bridgeTransactionsCount`

	const response = await get(url)
	if (response.status !== 200) throw new Error('No transactions found')
	return response.data.data
}
