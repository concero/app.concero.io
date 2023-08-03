import { lifiTokens } from '../../../constants/lifiTokens'
import { getDexTrades } from '../../../api/bitquery/getDexTrades'

export async function getTransactions(selection, setHistoryItems, setIsLoading) {
  function on_ok(res) {
    setIsLoading(false)
    console.log('RES ', res)
    const transactions = res.data.data.ethereum.dexTrades
    setHistoryItems(transactions)
  }

  function on_err(err) {
    setIsLoading(false)
    console.log('ERR ', err)
  }

  console.log('selection ', selection)
  const network = selection.from.chain.name.toLowerCase()
  let baseCurrency = selection.from.token.address
  let quoteCurrency = lifiTokens[selection.from.chain.id].find(
    (token) => token.symbol === selection.to.token.symbol,
  ).address

  const limit = 100
  const nullAddress = '0x0000000000000000000000000000000000000000'

  if (baseCurrency === nullAddress) {
    baseCurrency = lifiTokens[selection.from.chain.id][1].address
  }
  if (quoteCurrency === nullAddress) {
    quoteCurrency = lifiTokens[selection.from.chain.id][1].address
  }
  // console.log('baseCurrency ', baseCurrency)
  // console.log('quoteCurrency ', quoteCurrency)
  // console.log('network ', network)
  setIsLoading(true)
  const { res, ok, err } = await getDexTrades({ network, limit, baseCurrency, quoteCurrency })
  if (ok) on_ok(res)
  if (err) on_err(err)
}
