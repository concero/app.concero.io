import { Address } from 'viem'
import { post } from '../../client'
import { AxiosResponse } from 'axios'
/**@deprecated */
export const acceptTerms = async (address: Address): Promise<AxiosResponse> => {
	const url = `${process.env.CONCERO_API_URL}/users/accept_terms`

	const response = await post(url, {
		address,
	})
	return response
}
