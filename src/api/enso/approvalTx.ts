import { get } from '../client'

export async function fetchApprovalTx(chainId, fromAddress, tokenAddress, amount) {
	const url = `https://api.enso.finance/api/v1/wallet/approve?chainId=${chainId}&fromAddress=${fromAddress}&tokenAddress=${tokenAddress}&amount=${amount}`
	console.log(`fetchApprovalTx: chainid: ${chainId} fromAddress: ${fromAddress} tokenAddress: ${tokenAddress} amount: ${amount}`)
	try {
		const response = await get(url)
		return response.data
	} catch (error) {
		console.log(error)
	}
}
