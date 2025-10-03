import { Address } from 'viem'
import { SignMessageMutateAsync } from 'wagmi/query'
import { getAccessToken } from '@/entities/User'
import { UserApi } from '@/entities/User'
import { TApiResponse } from '@/shared/types/api'
export const verifyUser = async ({
	address,
	retry,
	signMessageAsync,
	acceptTerms,
}: {
	address: Address
	signMessageAsync: SignMessageMutateAsync<unknown>
	acceptTerms: (arg: UserApi.AcceptTerms.RequestBody) => Promise<TApiResponse<UserApi.AcceptTerms.ResponseBody>>
	retry?: boolean
}): Promise<boolean> => {
	retry ??= true
	try {
		const result = await acceptTerms({ address })
		if (!result.payload?.terms_of_use_signed_version) {
			throw new Error()
		}
		return true
	} catch (errObj: unknown) {
		if (retry) {
			try {
				await getAccessToken(address, signMessageAsync)
				return verifyUser({ address, signMessageAsync, retry: false, acceptTerms })
			} catch (error) {
				console.error('Error during get access token', error)
				return false
			}
		} else {
			throw new Error('Error during authentication')
		}
	}
}
