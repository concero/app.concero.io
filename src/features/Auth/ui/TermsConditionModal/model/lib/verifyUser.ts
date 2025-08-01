import { Address } from 'viem'
import { SignMessageMutateAsync } from 'wagmi/query'
import { getAccessToken, userServiceApi } from '@/entities/User'

export const verifyUser = async (
	address: Address,
	signMessageAsync: SignMessageMutateAsync<unknown>,
	retry = true,
): Promise<boolean> => {
	try {
		// await acceptTerms(address)
		await userServiceApi.acceptTerms(address)
		return true
	} catch (errObj: unknown) {
		if (retry) {
			try {
				await getAccessToken(address, signMessageAsync)
				return verifyUser(address, signMessageAsync, false)
			} catch (error) {
				console.error('Error during get access token', error)
				return false
			}
		} else {
			throw new Error('Error during authentication')
		}
	}
}
