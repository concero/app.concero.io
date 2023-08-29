import { tokens } from '../../../constants/tokens'
import { getDexTrades } from '../../../api/bitquery/getDexTrades'

export function setTransactions(setHistoryItems, transactions) {
  setHistoryItems(transactions)
}

export function appendTransactions(setHistoryItems, transactions) {
  setHistoryItems((prev) => [...prev, ...transactions])
}

export async function getTransactions(selection, historyItems, setHistoryItems, setIsLoading) {
  function on_ok(res) {
    setIsLoading(false)
    const transactions = res.data.data.ethereum.dexTrades

    setTransactions(setHistoryItems, transactions)
  }

  function on_err(err) {
    setIsLoading(false)
    console.log('ERR ', err)
  }

  const network = selection.from.chain.name.toLowerCase()
  let baseCurrency = selection.from.token.address
  let quoteCurrency = tokens[selection.from.chain.id].find(
    (token) => token.symbol === selection.to.token.symbol,
  ).address

  const limit = 100
  const nullAddress = '0x0000000000000000000000000000000000000000'

  if (baseCurrency === nullAddress) {
    baseCurrency = tokens[selection.from.chain.id][1].address
  }
  if (quoteCurrency === nullAddress) {
    quoteCurrency = tokens[selection.from.chain.id][1].address
  }

  setIsLoading(true)
  const { res, ok, err } = await getDexTrades({
    network,
    limit,
    baseCurrency,
    quoteCurrency,
  })

  if (ok) on_ok(res)
  if (err) on_err(err)
}
