import { get } from '../../client'
import { type Address } from 'viem'

export interface AirdropWallet {
	address: Address
	roles: string[]
}

export const getAirdropWallet = async (address: Address): Promise<AirdropWallet | null> => {
	const url = `${process.env.CONCERO_API_URL}/airdrop_wallets/${address}`

	const response = await get(url)
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data.data
}
