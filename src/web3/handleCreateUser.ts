import { type Address } from 'viem'
import { createUser } from '../api/concero/user/createUser'

export const handleCreateUser = async (address: Address) => {
	try {
		await createUser(address)
	} catch (error) {
		console.error('handleCreateUser: ', error.data.error)
	}
}
