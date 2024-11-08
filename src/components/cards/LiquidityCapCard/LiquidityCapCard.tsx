import { Card } from '../Card/Card'
import classNames from './LiquidityCapCard.module.pcss'
import { ProgressBar } from '../../layout/progressBar/ProgressBar'
import { SkeletonLoader } from '../../layout/SkeletonLoader/SkeletonLoader'
import { useGetLiquidity } from '../../pool/poolScripts/useGetLiquidity'
import { toLocaleNumber } from '../../../utils/formatting'
import { InfoTooltip } from '../../wrappers/InfoTooltip/InfoTooltip'

const description =
	'For security reasons, our pools have a maximum capacity limit. However, this can sometimes be exceeded because the pool also stores the fees it has earned.'

export const LiquidityCapCard = () => {
	const { poolLiquidity, maxCap, isLoading } = useGetLiquidity()
	const percentage = (poolLiquidity / maxCap) * 100

	const formatedMaxCap = toLocaleNumber(maxCap)

	return (
		<Card className={`${classNames.liquidityCapCard} cardConvex`}>
			<div className="row gap-sm ac">
				<h4>Pool Liquidity</h4>
				<InfoTooltip title={'Capacity limitations'} description={description} tooltipId={'pool-liquidity'} />
			</div>
			{isLoading ? (
				<SkeletonLoader width={128} height={27.5} />
			) : (
				<h3 className={classNames.value}>
					{toLocaleNumber(poolLiquidity)} <span className={classNames.maxValue}>/{formatedMaxCap}</span>
				</h3>
			)}
			{isLoading ? <SkeletonLoader height={8} /> : <ProgressBar percentage={percentage || 0} />}
			<div className="row jsb ac">
				<p className="body1">0</p>
				<p className="body1">{formatedMaxCap}</p>
			</div>
		</Card>
	)
}
