import { ConceroIcon } from '../../../assets/icons/conceroIcon'
import { InfoIcon } from '../../../assets/icons/InfoIcon'
import { IconButton } from '../../buttons/IconButton/IconButton'
import { ArrowLeftIcon } from '../../../assets/icons/ArrowLeftIcon.tsx'
import classNames from './UsdcPool.module.pcss'
import { PoolSummary } from './PoolSummary/PoolSummary'
import { Link } from 'react-router-dom'
import { routes } from '../../../constants/routes'
import { EarningsCard } from '../EarningsCard/EarningsCard'

export const UsdcPool = () => {
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
				<h4>Concero Pool</h4>
				<InfoIcon />
			</div>

			<EarningsCard />

			<PoolSummary />
		</div>
	)
}
