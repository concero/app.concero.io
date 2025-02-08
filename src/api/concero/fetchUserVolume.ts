import { get, post } from '../client'

interface Options {
	address: string
	startDate: { $numberDecimal: string } | number
	endDate: { $numberDecimal: string } | number
	isCrossChain: boolean | undefined
	chainIds?: string[]
}

export const fetchUserVolume = async ({ address, startDate, endDate, isCrossChain, chainIds }: Options) => {
	const startDateValue = typeof startDate === 'object' ? Number(startDate.$numberDecimal) : startDate
	const endDateValue = typeof endDate === 'object' ? Number(endDate.$numberDecimal) : endDate

	const url = `${process.env.CONCERO_API_URL}/userVolume`

	const requestBody = {
		address,
		startDate: startDateValue,
		endDate: endDateValue,
		isCrossChain,
		chainIds,
	}
	const response = await post(url, requestBody)
	if (response.status !== 200) throw new Error(response.statusText)
	return response.data.data
}
