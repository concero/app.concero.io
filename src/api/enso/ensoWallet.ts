import { get } from '../client'

//
// exprort async function approveTx(chainId, fromAddress, tokenAddress, amount) {
//   const url = `https://api.enso.finance/api/v1/wallet/approve?chainId=${chainId}&fromAddress=${fromAddress}&tokenAddress=${tokenAddress}&amount=${amount}`;
//   try {
//     const response = await get(url)
//     return response
//   } catch (error) {
//     console.log(error)
//
//   }
// }
//
//

export async function fetchEnsoWallet(chainId, fromAddress) {
	const url = `https://api.enso.finance/api/v1/wallet?chainId=${chainId}&fromAddress=${fromAddress}`
	console.log('fetchEnsoWallet', 'chainId', chainId, 'fromAddress', fromAddress)
	try {
		const response = await get(url)
		return response.data
	} catch (error) {
		console.log(error)
	}
}
