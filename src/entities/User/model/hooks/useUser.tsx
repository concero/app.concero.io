import { useAccount } from 'wagmi'
import { useUserByAddress } from '../../api/userApi'

export const useUser = () => {
	const { address } = useAccount()
	const user = useUserByAddress(address)
	return user
}
