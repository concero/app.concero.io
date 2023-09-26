import { getBalances } from 'wido'

export const getUserBalancesSortedByChain = async (address: `0x${string}` | undefined | string) => {
	if (!address) return {}
	const balances = await getBalances(address)
	return balances.reduce((acc: any, balance: any) => {
		if (!acc[balance.chainId]) acc[balance.chainId] = []
		acc[balance.chainId].push(balance)
		return acc
	}, {})
}
