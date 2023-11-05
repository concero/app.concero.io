import { get } from '../client'

interface IApprovalTx {
	token: string
	amount: string
	spender: string
	gas: string
	tx: {
		data: string
		to: string
		from: string
	}
}

export async function fetchApprovalTx(chainId: number, fromAddress: string, tokenAddress: string, amount: string): Promise<IApprovalTx> {
	const url = `https://api.enso.finance/api/v1/wallet/approve?chainId=${chainId}&fromAddress=${fromAddress}&tokenAddress=${tokenAddress}&amount=${amount}`
	// console.log(`fetchApprovalTx: chainid: ${chainId} fromAddress: ${fromAddress} tokenAddress: ${tokenAddress} amount: ${amount}`)
	try {
		const response = await get(url)
		return response.data
	} catch (error) {
		console.error(error)
	}
}
