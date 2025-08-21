import { Address } from 'viem'
import { SignMessageMutateAsync } from 'wagmi/query'
import { userAuthServiceApi } from '../../api/userApi'
import { LOCALSTORAGE_ACCESS_TOKEN_NAME } from '@/shared/consts/localstorage'
export const getAccessToken = async (
	address: Address,
	signMessageAsync: SignMessageMutateAsync<unknown>,
): Promise<true | never> => {
	if (!address) {
		console.error('Wallet not connected')
		throw new Error('Something went wrong')
	}

	try {
		const nonce = await userAuthServiceApi.authorize(address)

		if (!nonce) {
			console.error('No nonce received')
			throw new Error('No nonce received')
		}
		// @ts-expect-error TODO: Fix
		const signature = await signMessageAsync({ message: nonce, account: address.toLowerCase() })

		const token = await userAuthServiceApi.verify({
			address,
			signature,
		})
		if (token) {
			localStorage.setItem(LOCALSTORAGE_ACCESS_TOKEN_NAME, token)
			return true
		} else {
			console.error('After verify, token:', token)
			throw new Error('After verify something went wrong')
		}
	} catch (errMsg) {
		console.error('Error during authentication', errMsg)
		throw new Error('Something went wrong')
	}
}
