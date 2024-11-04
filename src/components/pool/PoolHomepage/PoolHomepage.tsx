import classNames from './PoolHomepage.module.pcss'
import { StatisticCard } from '../../cards/StatisticCard/StatisticCard'
import { useEffect, useState } from 'react'
import type { Fee } from '../../../api/concero/types'
import { fetchFees } from '../../../api/concero/pool/fetchFees'
import { TotalVolumeCard } from '../../cards/TotalVolumeCard/TotalVolumeCard'
import { RewardsCard } from '../../cards/RewardsChartCard/RewardsChartCard'
import { PreviewPoolCard } from './PreviewPoolCard/PreviewPoolCard'
import { PreviewPoolCardDisabled } from './PreviewPoolCardDisable/PreviewPoolCardDisabled'
import { routes } from '../../../constants/routes'
import { getLpProvidersCount } from '../../../api/concero/pool/getLpProvidersCount'

export const PoolHomepage = () => {
	const [fees, setFees] = useState<Fee[]>([])
	const [providersCount, setProvidersCount] = useState<number>(0)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const getTotalVolume = async () => {
		try {
			setIsLoading(true)
			const [fees, lpProvidersCount] = await Promise.all([fetchFees(), getLpProvidersCount()])

			setFees(fees)
			setProvidersCount(lpProvidersCount)
			setIsLoading(false)
		} catch (e) {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		void getTotalVolume()
	}, [])

	return (
		<div className={classNames.details}>
			<div className="gap-lg">
				<div className={classNames.column}>
					<TotalVolumeCard isLoading={isLoading} fees={fees} />
					<RewardsCard isLoading={isLoading} title="Rewards" fees={fees} />
				</div>
				<div className="gap-lg row">
					<StatisticCard isLoading={isLoading} title="LP Providers" value={providersCount} />
					<StatisticCard isLoading={isLoading} title="Transactions" value={fees.length} />
				</div>
			</div>
			<div className={classNames.column}>
				<PreviewPoolCard link={routes.poolUsdc} isLoading={isLoading} fees={fees} />
				<PreviewPoolCardDisabled />
			</div>
		</div>
	)
}
