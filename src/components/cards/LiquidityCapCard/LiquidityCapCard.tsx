import { Card } from '../Card/Card'
import classNames from './LiquidityCapCard.module.pcss'
import { ProgressBar } from '../../layout/progressBar/ProgressBar'
import { useGetLiquidity } from '../../pool/poolScripts/useGetLiquidity'
import { InfoTooltip } from '../../layout/InfoTooltip/InfoTooltip'

const description =
	'For security reasons, our pools have a maximum capacity limit. However, this can sometimes be exceeded because the pool also stores the fees it has earned.'

export const LiquidityCapCard = () => {
	const { poolLiquidity, maxCap, isLoading } = useGetLiquidity()

	return (
		<Card className={`${classNames.liquidityCapCard} cardConvex`}>
			<div className="row gap-sm ac">
				<h4>Pool Liquidity</h4>
				<InfoTooltip title={'Capacity limitations'} description={description} tooltipId={'pool-liquidity'} />
			</div>
			<ProgressBar type="big" isLoading={isLoading} currentValue={poolLiquidity} maxValue={maxCap} />
		</Card>
	)
}
