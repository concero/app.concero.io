import { getDexTrades } from '../../../api/bitquery/getDexTrades'
import { config } from '../../../constants/config'

const limit = 100

export async function getTransactions(selection, state, dispatch, tokens) {
  function on_ok(res) {
    if (state.error) dispatch({ type: 'SET_ERROR', payload: null })
    const transactions = res.data.data.ethereum.dexTrades
    dispatch({ type: 'SET_ITEMS', payload: transactions })
  }

  function on_err(err) {
    dispatch({ type: 'SET_ERROR', payload: err })
  }

  const network = selection.from.chain.name.toLowerCase()
  let baseCurrency = selection.from.token.address
  let quoteCurrency = tokens[selection.from.chain.id].find(
    (token) => token.symbol === selection.to.token.symbol,
  ).address

  if (baseCurrency === config.NULL_ADDRESS) {
    baseCurrency = tokens[selection.from.chain.id][1].address
  }
  if (quoteCurrency === config.NULL_ADDRESS) {
    quoteCurrency = tokens[selection.from.chain.id][1].address
  }

  dispatch({ type: 'SET_LOADING', payload: true })
  const { res, ok, err } = await getDexTrades({
    network,
    limit,
    baseCurrency,
    quoteCurrency,
  })
  dispatch({ type: 'SET_LOADING', payload: false })
  if (ok) on_ok(res)
  if (err) on_err(err)
}
