import classNames from './DetailsTab.module.pcss'
import { CLinksCard } from '../../../../cards/LinksCard/LinksCard'
import { TotalFeesCard } from '../../../../cards/TotalFeesCard/TotalFeesCard'
import { TotalTransactionsCard } from '../../../../cards/TotalTransactionsCard/TotalTransactionsCard'
import { TotalVolumeCard } from '../../../../cards/TotalVolumeCard/TotalVolumeCard'
import { VolumeByChainCard } from '../../../../cards/VolumeByChainCard/VolumeByChainCard'

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
			<div className={classNames.restInfoSection}>
				<VolumeByChainCard />
				<CLinksCard />
			</div>
		</div>
	)
}
