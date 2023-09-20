import { quote } from 'wido'
import { ManageState } from '../../components/cards/StakingHeaderCard/ManageModal/useManageReducer/types'
import { addingDecimals } from '../../utils/formatting'

export async function getQuote(manageState: ManageState) {
  const { from, to, address } = manageState
  if (!from || !from.amount || !to || !address) throw new Error('Missing params')

  const amount = addingDecimals(parseFloat(from.amount), from.token.decimals)

  const quoteParams = {
    fromChainId: from.chain.id,
    fromToken: from.token.address,
    toChainId: to.chain.id,
    toToken: to.token.address,
    amount,
    slippagePercentage: 3,
    user: address,
  }

  console.log('quoteParams ', quoteParams)

  try {
    const quoteResult = await quote(quoteParams)
    console.log(quoteResult)
    if (!quoteResult.isSupported) throw new Error('Route not supported')
    return quoteResult
  } catch (error) {
    console.error(`Error getting quote: ${error.message}`)
  }
}
