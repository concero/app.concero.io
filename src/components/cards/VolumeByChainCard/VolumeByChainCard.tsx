import { useEffect, useState } from 'react'
import { BarChartCard, type ReChartsData } from '../BarChartCard/BarChartCard'
import { fetchFees } from '../../../api/concero/fetchFees'

const chainsMap = {
	8453: 'BASE',
	42161: 'ARB',
	137: 'POL',
	43114: 'AVAX',
}

export const VolumeByChainCard = () => {
	const [volumeByChain, setVolumeByChain] = useState<ReChartsData[]>([])

	const getTotalVolume = async () => {
		// TODO: unhandled error thrown by fetchFees!
		const fees = await fetchFees()

		const chainsDataMap: Record<number, number> = {}

		// TODO: 2 loops can be combined into 1 reduce method!
		fees.forEach(fee => {
			const currentValue = chainsDataMap[fee.chainId] ?? 0
			chainsDataMap[fee.chainId] = currentValue + fee.loanGivenOut
		})

		const data = Object.entries(chainsDataMap).map(([chainId, amount]) => {
			return {
				name: chainsMap[Number(chainId)],
				amount: Number(amount.toFixed(2)),
			}
		})

		setVolumeByChain(data)
	}

	useEffect(() => {
		// TODO: unhandled promise rejection
		getTotalVolume()
	}, [])

	return <BarChartCard titleCard="Volume by chain" data={volumeByChain} />
}
