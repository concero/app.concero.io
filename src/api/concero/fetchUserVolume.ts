import { get } from '../client'

interface Options {
	address: string
	startDate: { $numberDecimal: string } | number
	endDate: { $numberDecimal: string } | number
	isCrossChain: boolean | undefined
}

export const fetchUserVolume = async ({ address, startDate, endDate, isCrossChain }: Options) => {
	const isCrossChainQuery = isCrossChain ? `&search=${isCrossChain}` : ''

	const startDateValue = typeof startDate === 'object' ? Number(startDate.$numberDecimal) : startDate
	const endDateValue = typeof endDate === 'object' ? Number(endDate.$numberDecimal) : endDate

	const url = `${process.env.CONCERO_API_URL}/userVolume?address=${address}&startDate=${startDateValue}&endDate=${endDateValue}${isCrossChainQuery}`

	const response = await get(url)
	if (response.status !== 200) throw new Error(response.statusText)
	return response.data.data
}
