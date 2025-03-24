import { post } from '../../client'
import { TUserSocialNetworkType } from '@/entities/User'
/**@deprecated */
export const disconnectNetwork = async (address: string, network: TUserSocialNetworkType): Promise<boolean> => {
	const url = `${process.env.CONCERO_API_URL}/disconnectNetwork/${network}`

	const response = await post(url, {
		address,
	})
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data.data
}
