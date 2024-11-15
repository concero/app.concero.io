import classNames from './WarningBanner.module.pcss'
import { InfoIcon } from '../../../assets/icons/InfoIcon'

export const WarningBanner = () => {
	return (
		<div className={classNames.container}>
			<div className={classNames.logoWrap}>
				<InfoIcon color={'var(--color-warning-600)'} />
			</div>
			<p className={classNames.title}>Transaction Tracking (CERs) is Updating Now</p>
			<p className={classNames.subtitle}>
				Your streaks, CERs, and transaction history are safe and will be visible once the update is complete.
			</p>
		</div>
	)
}
