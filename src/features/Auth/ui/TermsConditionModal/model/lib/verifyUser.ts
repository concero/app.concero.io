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
	acceptTerms: (arg: UserApi.AcceptTerms.RequestBody) => Promise<any>
	retry?: boolean
}): Promise<boolean> => {
	retry ??= true
	try {
		await acceptTerms({ address })
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
