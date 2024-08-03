import { get } from '../client'
import { type Address } from 'viem'
import { type IConceroInfraTx } from './transactionType'

export const fetchUserTransactions = async (address: Address): Promise<IConceroInfraTx[]> => {
	const url = `${process.env.CONCERO_API_URL}/concero_infra_txs?address=${address}`

	const response = await get(url)
	if (response.status !== 200) throw new Error('No transactions found')
	return response.data.data
}
