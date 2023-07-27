import { fetchPairs } from '../../../api/dexscreener/fetchPairs'
import { fetchTransactionHistory } from '../../../api/dexscreener/fetchTransactionHistory'

const getTokensPair = async (selection) => {
  const { pairs } = await fetchPairs(
    `${selection.historyCard.from.token.symbol}/${selection.historyCard.to.token.symbol}`,
  )

  if (!pairs) throw new Error('No pairs found')

  return pairs[0]
}

const getTransactionHistory = async (tokensPair: string, setHistoryItems: () => void) => {
  const response = await fetchTransactionHistory(tokensPair)

  if (!response.length) throw new Error('No transactions found')

  setHistoryItems(response)
}

export const handleFetchTransactionHistory = async (setIsLoading, setHistoryItems, selection) => {
  setIsLoading(true)
  const tokensPair = await getTokensPair(selection)

  try {
    await getTransactionHistory(tokensPair, setHistoryItems)
  } catch (e) {
    console.error(e)
  }

  setIsLoading(false)

  return setInterval(() => getTransactionHistory(tokensPair, setHistoryItems), 10000)
}
