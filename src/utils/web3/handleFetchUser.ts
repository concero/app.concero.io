import { type Address } from 'viem'
import { createUser } from '../../api/concero/user/createUser'
import { fetchUserByAddress } from '../../api/concero/user/fetchUserByAddress'
import { type IUser } from '../../api/concero/user/userType'

export const handleFetchUser = async (address: Address): Promise<IUser | null> => {
	try {
		return await fetchUserByAddress(address)
	} catch (error) {
		console.error('error in handleCreateUser:', error)

		if (error.data.error === 'User not found') {
			await createUser(address)
			return await fetchUserByAddress(address)
		}
	}
}
