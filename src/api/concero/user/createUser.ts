import type { Fee } from '../types'
import { post } from '../../client'
import { type Address } from 'viem'

export const createUser = async (address: Address): Promise<Fee> => {
	const url = `${process.env.CONCERO_API_URL}/users`

	const response = await post(url, { address })
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data.data
}
