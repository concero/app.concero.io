import { Address } from 'viem'
import { post } from '../../client'
import { AxiosResponse } from 'axios'
import { patch } from '@/shared/api/axiosClient'
import { TApiResponse } from '@/shared/types/api'
/**@deprecated */
export const acceptTerms = async (address: Address): Promise<AxiosResponse> => {
	const url = `${process.env.CONCERO_API_URL}/users/accept_terms`

	const response = await patch<TApiResponse<{ terms_of_use_signed_version: string }>>(url, {
		address,
	})
	return response
}
