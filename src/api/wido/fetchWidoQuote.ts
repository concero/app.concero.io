// import { quote } from 'wido'
// import { ManageState } from '../../components/cards/EarnHeaderCard/ManageModal/useEarnReducer/types'
// import { addingAmountDecimals } from '../../utils/formatting'
// import { QuoteResult } from 'types'
//
// export async function fetchWidoQuote(manageState: ManageState): Promise<QuoteResult> {
// 	const { from, to, address } = manageState
// 	if (!from || !from.amount || !to || !address) return null
// 	const amount = addingAmountDecimals(parseFloat(from.amount), from.token.decimals)
// 	const quoteParams = {
// 		fromChainId: Number(from.chain.id),
// 		fromToken: from.token.address,
// 		toChainId: Number(to.chain.id),
// 		toToken: to.token.address,
// 		amount,
// 		slippagePercentage: 0.5,
// 		...(address && { user: address }),
// 	}
//
// 	console.log('quoteParams', quoteParams)
//
// 	const quoteResult = await quote(quoteParams)
// 	console.log('quoteResult', quoteResult)
// 	if (!quoteResult.isSupported) throw new Error('Route not supported')
// 	return quoteResult
// }
