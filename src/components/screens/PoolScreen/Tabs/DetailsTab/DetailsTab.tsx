import classNames from './DetailsTab.module.pcss'
import { TotalFeesCard } from '../../../../cards/TotalFeesCard/TotalFeesCard'
import { TotalTransactionsCard } from '../../../../cards/TotalTransactionsCard/TotalTransactionsCard'
import { TotalVolumeCard } from '../../../../cards/TotalVolumeCard/TotalVolumeCard'

export const DetailsTab = () => {
	return (
		<div className={classNames.details}>
			<div className={classNames.totalInfoSection}>
				<TotalVolumeCard />
				<div className="f1 gap-md">
					<TotalFeesCard />
					<TotalTransactionsCard />
				</div>
			</div>
		</div>
	)
}
