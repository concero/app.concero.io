import { get } from '../clientProxy'
import { type Pair } from './types'

export const fetchPairs = async (tokenSymbols: string): Promise<Pair[]> => {
	const url = `https://api.dexscreener.com/latest/dex/search/?q=${tokenSymbols}`

	const response = await get({ url })

	return response.data
}
