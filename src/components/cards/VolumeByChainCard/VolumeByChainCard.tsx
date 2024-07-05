import { useEffect, useState } from 'react'
import { BarChartCard, type ReChartsData } from '../BarChartCard/BarChartCard'
import { fetchFees } from '../../../api/concero/fetchFees'

const chainsMap = {
	84532: 'BASE',
	421614: 'ARB',
	11155420: 'OPT',
}

export const VolumeByChainCard = () => {
	const [volumeByChain, setVolumeByChain] = useState<ReChartsData[]>([])

	const getTotalVolume = async () => {
		const fees = await fetchFees()

		const chainsDataMap: Record<number, number> = {}

		fees.forEach(fee => {
			const currentValue = chainsDataMap[fee.chainId] ?? 0
			chainsDataMap[fee.chainId] = currentValue + fee.loanGivenOut
		})

		const data = Object.entries(chainsDataMap).map(([chainId, amount]) => {
			return {
				name: chainsMap[Number(chainId)],
				amount: amount.toFixed(2),
			}
		})

		setVolumeByChain(data)
	}

	useEffect(() => {
		getTotalVolume()
	}, [])

	return <BarChartCard titleCard="Volume by chain" data={volumeByChain} />
}
