import { Address } from 'viem'
import { patch } from '@/shared/api/axiosClient'
import { TApiResponse } from '@/shared/types/api'
/**@deprecated */
export const acceptTerms = async (address: Address) => {
	const url = `${process.env.CONCERO_API_URL}/users/acceptTerms`

	const response = await patch<TApiResponse<{ terms_of_use_signed_version: string }>>(url, {
		address,
	})
	if (response.code !== 'ok') {
		throw new Error('Cannot be accept')
	}
	return response.payload.terms_of_use_signed_version
}
