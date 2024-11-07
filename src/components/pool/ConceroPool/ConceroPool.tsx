import { ConceroIcon } from '../../../assets/icons/ConceroIcon'
import { IconButton } from '../../buttons/IconButton/IconButton'
import { ArrowLeftIcon } from '../../../assets/icons/ArrowLeftIcon.tsx'
import classNames from './ConceroPool.module.pcss'
import { PoolSummary } from './PoolSummary/PoolSummary'
import { Link } from 'react-router-dom'
import { routes } from '../../../constants/routes'
import { EarningsCard } from '../EarningsCard/EarningsCard'
import { InfoTooltip } from '../../wrappers/InfoTooltip/InfoTooltip'
import { Tag } from '../../tags/Tag/Tag'
import { useGetLiquidity } from '../poolScripts/useGetLiquidity'

const poolDescription =
	'For security reasons, our pools have a maximum capacity limit. However, this can sometimes be exceeded because the pool also stores the fees it has earned.'

export const ConceroPool = () => {
	const { poolLiquidity, maxCap, isLoading } = useGetLiquidity()
	const poolIsFilled = poolLiquidity > maxCap

	return (
		<div className={classNames.container}>
			<Link to={routes.pool} className={classNames.back}>
				<IconButton variant="secondary">
					<ArrowLeftIcon />
				</IconButton>
			</Link>

			<div className="row ac gap-sm">
				<div className={classNames.iconWrap}>
					<ConceroIcon />
				</div>
				<h4 className={classNames.title}>Concero</h4>
				{poolIsFilled && (
					<>
						<InfoTooltip description={poolDescription} tooltipId={'pool-preview'} />
						<Tag size="sm">Pool is filled</Tag>
					</>
				)}
			</div>

			<EarningsCard poolDataIsLoading={isLoading} poolIsFilled={poolIsFilled} />

			<PoolSummary />
		</div>
	)
}
