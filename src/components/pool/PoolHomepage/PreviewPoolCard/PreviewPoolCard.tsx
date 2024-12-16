import classNames from './PreviewPoolCard.module.pcss'
import { UsdcIcon } from '../../../../assets/icons/UsdcIcon'
import { Card } from '../../../cards/Card/Card'
import { Button } from '../../../buttons/Button/Button'
import { useEffect, useState } from 'react'
import { groupDataByWeeks } from '../../../../utils/charts'
import { type Fee } from '../../../../api/concero/types'
import { Link } from 'react-router-dom'
import { useGetLiquidity } from '../../poolScripts/useGetLiquidity'
import { SkeletonLoader } from '../../../layout/SkeletonLoader/SkeletonLoader'
import { PoolCard } from '../../PoolCard/PoolCard'
import { toLocaleNumber } from '../../../../utils/formatting'
import { Tag } from '../../../layout/Tag/Tag'
import { type ChartData } from '../../../../types/utils'

interface Props {
	fees: Fee[]
	link: string
	isLoading: boolean
}

export const PreviewPoolCard = ({ fees, link, isLoading }: Props) => {
	const { poolLiquidity, maxCap, isLoading: isLiquidityLoading } = useGetLiquidity()

	const [commonApyValue, setCommonApyValue] = useState<string>('0')
	const [totalRewards, setTotalRewards] = useState<string>('0')
	const poolIsFilled = poolLiquidity > maxCap

	const handleAPY = async (fees: Fee[]) => {
		let rewards = 0

		const feeData: ChartData[] = fees.map(fee => {
			rewards += fee.feeMade
			return {
				time: fee.timestamp * 1000,
				value: fee.feeMade,
			}
		})

		const groupedWeeklyFees = groupDataByWeeks(feeData)

		if (groupedWeeklyFees.length < 2) {
			console.warn('Not enough data to calculate APY')
			return
		}

		const previousWeekFees = groupedWeeklyFees[groupedWeeklyFees.length - 2].value
		const apy = ((previousWeekFees * 52) / poolLiquidity) * 100

		setCommonApyValue(toLocaleNumber(apy).toString())
		setTotalRewards(toLocaleNumber(rewards).toString())
	}

	useEffect(() => {
		if (!fees.length) return
		void handleAPY(fees)
	}, [fees])

	return (
		<Card className="w-full gap-xxl">
			<div className="gap-lg">
				<div className="row ac jsb wrap gap-xs">
					<div className="row ac gap-sm">
						<div className={classNames.iconWrap}>
							<UsdcIcon />
						</div>
						<h4 className={classNames.title}>USDC</h4>
						{poolIsFilled && <Tag size="sm">Full</Tag>}
					</div>

					{isLoading ? (
						<SkeletonLoader height={24} width={95} />
					) : (
						<h3 className={classNames.value}>APY {commonApyValue}%</h3>
					)}
				</div>

				<div className="gap-md">
					<div className={classNames.metric}>
						<p>Total Liquidity</p>
						<div className="row gap-xs">
							{isLiquidityLoading ? (
								<SkeletonLoader height={20} width={64} />
							) : (
								<b>${toLocaleNumber(poolLiquidity)}</b>
							)}
							<p>from</p>
							{isLiquidityLoading ? (
								<SkeletonLoader height={20} width={64} />
							) : (
								<b>${toLocaleNumber(maxCap)}</b>
							)}
						</div>
					</div>

					<div className={classNames.metric}>
						<p>Rewards Distributed</p>
						<div>
							{isLiquidityLoading ? <SkeletonLoader height={20} width={64} /> : <b>${totalRewards}</b>}
						</div>
					</div>
				</div>
			</div>

			<div className={classNames.buttons}>
				<PoolCard poolIsFilled={poolIsFilled} depositButtonClasses={classNames.button} isDepositOnly />

				<Link to={link} className={classNames.button}>
					<Button isFull size="lg" variant="secondaryColor">
						Open Earnings
					</Button>
				</Link>
			</div>
		</Card>
	)
}
