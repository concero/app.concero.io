import classNames from './WarningBanner.module.pcss'
import { InfoIcon } from '../../../assets/icons/InfoIcon'

export const WarningBanner = () => {
	return (
		<div className={classNames.container}>
			<div className={classNames.logoWrap}>
				<InfoIcon color={'var(--color-warning-600)'} />
			</div>
			<p className={classNames.title}>Your actions are being updated</p>
			<p className={classNames.subtitle}>
				Your latest streaks, CERs and tx history are safely recorded and will appear on your profile soon.
			</p>
		</div>
	)
}
