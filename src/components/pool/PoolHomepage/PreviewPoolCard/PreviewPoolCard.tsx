import classNames from './PreviewPoolCard.module.pcss'
import { ConceroIcon } from '../../../../assets/icons/conceroIcon'
import { Card } from '../../../cards/Card/Card'
import { Button } from '../../../buttons/Button/Button'
import { useEffect, useState } from 'react'
import { getUniqueChatData, groupDataByWeeks } from '../../../../utils/charts'
import { type Fee } from '../../../../api/concero/types'
import { Link } from 'react-router-dom'
import { useGetLiquidity } from '../../poolScripts/useGetLiquidity'
import { SkeletonLoader } from '../../../layout/SkeletonLoader/SkeletonLoader'
import { PoolCard } from '../../PoolCard/PoolCard'

interface Props {
	fees: Fee[]
	link: string
	isLoading: boolean
}

export const PreviewPoolCard = ({ fees, link, isLoading }: Props) => {
	const { poolLiquidity, maxCap, isLoading: isLiquidityLoading } = useGetLiquidity()

	const [commonApyValue, setCommonApyValue] = useState<number>(0)
	const [totalRewards, setTotalRewards] = useState<number>(0)

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
		setCommonApyValue(weeklyAverageData[weeklyAverageData.length - 2].value)

		setTotalRewards(rewards)
	}

	useEffect(() => {
		if (!fees) return
		void setApyHandle()
	}, [fees])

	return (
		<Card className="w-full gap-xxl">
			<div className="gap-lg">
				<div className="row ac jsb">
					<div className="row ac gap-sm">
						<div className={classNames.logoWrap}>
							<ConceroIcon />
						</div>
						<h4 className={classNames.title}>USDC</h4>
					</div>
					{isLoading ? (
						<SkeletonLoader height={24} width={95} />
					) : (
						<h3 className={classNames.value}>APY {commonApyValue.toFixed(0)}%</h3>
					)}
				</div>

				<div className={classNames.metric}>
					<p>Total Liquidity</p>
					<div className="row gap-xs">
						{isLiquidityLoading ? (
							<SkeletonLoader height={20} width={64} />
						) : (
							<b>${poolLiquidity.toFixed(0)}</b>
						)}
						<p>from</p>
						{isLiquidityLoading ? <SkeletonLoader height={20} width={64} /> : <b>${maxCap}</b>}
					</div>
				</div>

				<div className={classNames.metric}>
					<p>Rewards Distributed</p>
					<div>
						{isLiquidityLoading ? (
							<SkeletonLoader height={20} width={64} />
						) : (
							<b>${totalRewards.toFixed(0)}</b>
						)}
					</div>
				</div>
			</div>

			<div className={classNames.buttons}>
				<PoolCard />

				<Link className={classNames.button} to={link}>
					<Button size="lg" variant="secondaryColor">
						Open Earnings
					</Button>
				</Link>
			</div>
		</Card>
	)
}
