import { UsdcIcon } from '../../../assets/icons/UsdcIcon'
import { IconButton } from '../../buttons/IconButton/IconButton'
import { ArrowLeftIcon } from '../../../assets/icons/ArrowLeftIcon.tsx'
import classNames from './ConceroPool.module.pcss'
import { PoolSummary } from './PoolSummary/PoolSummary'
import { Link } from 'react-router-dom'
import { routes } from '../../../constants/routes'
import { EarningsCard } from '../EarningsCard/EarningsCard'
import { Tag } from '../../layout/Tag/Tag'
import { useGetLiquidity } from '../poolScripts/useGetLiquidity'

export const ConceroPool = () => {
	const { poolLiquidity, maxCap, isLoading } = useGetLiquidity()
	const poolIsFilled = poolLiquidity > maxCap - 100

	return (
		<div className={classNames.container}>
			<Link to={routes.pool} className={classNames.back}>
				<IconButton variant="secondary">
					<ArrowLeftIcon />
				</IconButton>
			</Link>

			<div className="row ac gap-sm">
				<div className={classNames.iconWrap}>
					<UsdcIcon />
				</div>
				<h4 className={classNames.title}>USDC Pool</h4>
				{poolIsFilled && <Tag size="sm">Full</Tag>}
			</div>

			<EarningsCard poolDataIsLoading={isLoading} poolIsFilled={poolIsFilled} />

			<PoolSummary />
		</div>
	)
}
