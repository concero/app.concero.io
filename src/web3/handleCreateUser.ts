import { type Address } from 'viem'
import { createUser } from '../api/concero/user/createUser'

export const handleCreateUser = async (address: Address) => {
	try {
		const user = await createUser(address)

		console.log('new User', user) // TODO: delete it
	} catch (error) {
		console.log('handleCreateUser: ', error.data.error)
	}
}
