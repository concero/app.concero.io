import { type Address } from 'viem'
import { createUser } from '../api/concero/user/createUser'
import { fetchUserByAddress } from '../api/concero/user/fetchUserByAddress'
import { type IUser } from '../api/concero/user/userType'

export const handleFetchUser = async (address: Address): Promise<IUser | null> => {
	try {
		const currentUser = await fetchUserByAddress(address)
		if (currentUser) return currentUser

		await createUser(address)
		return await fetchUserByAddress(address)
	} catch (error) {
		console.error('error in handleCreateUser:', error)
		return null
	}
}
