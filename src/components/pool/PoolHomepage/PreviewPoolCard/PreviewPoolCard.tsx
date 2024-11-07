import classNames from './PreviewPoolCard.module.pcss'
import { ConceroIcon } from '../../../../assets/icons/ConceroIcon'
import { Card } from '../../../cards/Card/Card'
import { Button } from '../../../buttons/Button/Button'
import { useEffect, useState } from 'react'
import { getUniqueChatData, groupDataByWeeks } from '../../../../utils/charts'
import { type Fee } from '../../../../api/concero/types'
import { Link } from 'react-router-dom'
import { useGetLiquidity } from '../../poolScripts/useGetLiquidity'
import { SkeletonLoader } from '../../../layout/SkeletonLoader/SkeletonLoader'
import { PoolCard } from '../../PoolCard/PoolCard'
import { toLocaleNumber } from '../../../../utils/formatting'
import { Tag } from '../../../tags/Tag/Tag'
import { InfoTooltip } from '../../../wrappers/InfoTooltip/InfoTooltip'

interface Props {
	fees: Fee[]
	link: string
	isLoading: boolean
}

const poolDescription =
	'For security reasons, our pools have a maximum capacity limit. However, this can sometimes be exceeded because the pool also stores the fees it has earned.'

export const PreviewPoolCard = ({ fees, link, isLoading }: Props) => {
	const { poolLiquidity, maxCap, isLoading: isLiquidityLoading } = useGetLiquidity()

	const [commonApyValue, setCommonApyValue] = useState<string>('0')
	const [totalRewards, setTotalRewards] = useState<string>('0')
	const poolIsFilled = poolLiquidity > maxCap

	const setApyHandle = async () => {
		let rewards = 0

		const chartData = fees.map(fee => {
			const apyOnFeeFormula = fee.percentReturned * 365.25
			rewards += fee.feeMade

			return {
				time: fee.timestamp * 1000,
				value: apyOnFeeFormula,
			}
		})

		const weeklyAverageData = groupDataByWeeks(getUniqueChatData(chartData))

		setCommonApyValue(toLocaleNumber(weeklyAverageData[weeklyAverageData.length - 2].value))
		setTotalRewards(toLocaleNumber(rewards))
	}

	useEffect(() => {
		if (!fees.length) return
		void setApyHandle()
	}, [fees])

	return (
		<Card className="w-full gap-xxl">
			<div className="gap-lg">
				<div className="row ac jsb wrap gap-xs">
					<div className="row ac gap-xs">
						<div className={classNames.logoWrap}>
							<ConceroIcon />
						</div>
						<h4 className={classNames.title}>Concero</h4>
						{poolIsFilled && <InfoTooltip description={poolDescription} tooltipId={'pool-preview'} />}
					</div>
					{poolIsFilled && <Tag size="sm">Pool is filled</Tag>}

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
