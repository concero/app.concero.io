import { fetchPairs } from '../../../api/dexscreener/fetchPairs'
import { fetchTransactionHistory } from '../../../api/dextools/fetchTransactionHistory'

const getTokensPair = async selection => {
	const { pairs } = await fetchPairs(`${selection.historyCard.from.token.symbol}/${selection.historyCard.to.token.symbol}`)

	if (!pairs) throw new Error('No pairs found')

	const result = pairs.reduce((acc, pair) => {
		if (
			pair.baseToken.symbol.toLowerCase().includes(selection.historyCard.from.token.symbol.toLowerCase()) &&
			pair.quoteToken.symbol.toLowerCase().includes(selection.historyCard.to.token.symbol.toLowerCase())
		) {
			acc.push(pair)
		}
		return acc
	}, [])

	return result[0] || pairs[0]
}

const getTransactionHistory = async (tokensPair: string, setHistoryItems: () => void) => {
	const response = await fetchTransactionHistory(tokensPair)

	if (!response.length) throw new Error('No transactions found')

	setHistoryItems(response)
}

export const fetchTransactions = async (setIsLoading, setHistoryItems, selection) => {
	setIsLoading(true)
	const tokensPair = await getTokensPair(selection)

	try {
		await getTransactionHistory(tokensPair, setHistoryItems)
		setIsLoading(false)
		return setInterval(async () => {
			await getTransactionHistory(tokensPair, setHistoryItems)
		}, 10000)
	} catch (e) {
		setIsLoading(false)
		console.error(e)
	}
}
