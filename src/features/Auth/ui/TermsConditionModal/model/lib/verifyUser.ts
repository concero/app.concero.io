import { Address } from 'viem'
import { SignMessageMutateAsync } from 'wagmi/query'
import { getAccessToken } from '@/entities/User'
import { UserApi } from '@/entities/User'

export const verifyUser = async ({
	address,
	retry,
	signMessageAsync,
	acceptTerms,
}: {
	address: Address
	signMessageAsync: SignMessageMutateAsync<unknown>
	acceptTerms: (arg: UserApi.AcceptTerms.RequestBody) => Promise<UserApi.AcceptTerms.ResponseBody>
	retry?: boolean
}): Promise<boolean> => {
	retry ??= true
	try {
		const result = await acceptTerms({ address })
		if (result.terms_of_use_signed_version) return true
		throw new Error()
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
