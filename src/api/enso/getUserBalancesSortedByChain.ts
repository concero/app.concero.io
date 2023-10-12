import { fetchBalances } from './fetchBalance'
import { IFetchBalances, UserBalances } from './types'

const chainsMap = {
	0: '137',
	1: '1',
	2: '56',
	3: '42161',
	4: '10',
}

export const getUserBalancesSortedByChain = async (address: string): Promise<{ [key: string]: UserBalances[] } | {}> => {
	let balances = await Promise.all<IFetchBalances[]>([
		fetchBalances(address, chainsMap[0]),
		fetchBalances(address, chainsMap[1]),
		fetchBalances(address, chainsMap[2]),
		fetchBalances(address, chainsMap[3]),
		fetchBalances(address, chainsMap[4]),
	])

	let response: { [key: string]: UserBalances[] } | {} = {}

	for (let i = 0; i < balances.length; i++) {
		if (!balances[i]?.length) continue
		response[chainsMap[i]] = balances[i]
	}

	return response
}
