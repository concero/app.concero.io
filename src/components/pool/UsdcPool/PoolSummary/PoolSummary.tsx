import { useEffect, useState } from 'react'
import { LiquidityCapCard } from '../../../cards/LiquidityCapCard/LiquidityCapCard'
import { fetchFees } from '../../../../api/concero/pool/fetchFees'
import { AverageApyCard } from '../../AverageApyCard/AverageApyCard'
import classNames from './PoolSummary.module.pcss'
import { type Fee } from '../../../../api/concero/types'
import { RewardsCard } from '../../../cards/RewardsChartCard/RewardsChartCard'

export const PoolSummary = () => {
	const [fees, setFees] = useState<Fee[]>([])
	const [isLoading, setIsLoading] = useState(true)

	const setApyHandle = async () => {
		try {
			setIsLoading(true)
			const fees = await fetchFees()
			setFees(fees)
		} catch (e) {
			console.error(e)
		}
		setIsLoading(false)
	}

	useEffect(() => {
		void setApyHandle()
	}, [])

	return (
		<section className={classNames.container}>
			<h5>Pool summary</h5>

			<div className={classNames.wrap}>
				<div className="gap-lg">
					<LiquidityCapCard />
					<RewardsCard
						isLoading={isLoading}
						size="S"
						title="Rewards Distributed"
						withFilter={false}
						height={72}
						fees={fees}
					/>
				</div>
				<AverageApyCard isLoading={isLoading} fees={fees} />
			</div>
		</section>
	)
}
