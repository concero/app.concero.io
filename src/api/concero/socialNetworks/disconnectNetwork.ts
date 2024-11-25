import type { IUser } from '../user/userType'
import { post } from '../../client'
import { type Address } from 'viem'

export const disconnectNetwork = async (address: Address, network: keyof IUser['subscriptions']): Promise<boolean> => {
	const url = `${process.env.CONCERO_API_URL}/users/disconnectNetwork`

	const response = await post(url, {
		address,
		network,
	})
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data.data
}