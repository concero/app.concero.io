import { quote } from 'wido'
import { ManageState } from '../../components/cards/StakingHeaderCard/ManageModal/useManageReducer/types'
import { addingDecimals } from '../../utils/formatting'

export async function fetchQuote(manageState: ManageState) {
  const { from, to, address } = manageState
  if (!from || !from.amount || !to || !address) return null
  const amount = addingDecimals(parseFloat(from.amount), from.token.decimals)
  const quoteParams = {
    fromChainId: Number(from.chain.id),
    fromToken: from.token.address,
    toChainId: Number(to.chain.id),
    toToken: to.token.address,
    amount,
    slippagePercentage: 0.5,
    user: address,
  }

  const quoteResult = await quote(quoteParams)
  if (!quoteResult.isSupported) throw new Error('Route not supported')
  return quoteResult
}
