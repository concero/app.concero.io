import { get } from '../client'

interface Options {
	address: string
	startDate: number
	endDate: number
	isCrossChain: boolean | undefined
}

export const fetchUserVolume = async ({ address, startDate, endDate, isCrossChain }: Options) => {
	const isCrossChainQuery = isCrossChain ? `&search=${isCrossChain}` : ''

	const url = `${process.env.CONCERO_API_URL}/userVolume?address=${address}&startDate=${startDate}&endDate=${endDate}${isCrossChainQuery}`

	const response = await get(url)
	if (response.status !== 200) throw new Error(response.statusText)
	return response.data.data
}
