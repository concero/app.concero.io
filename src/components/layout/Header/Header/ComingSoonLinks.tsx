import { Link } from 'react-router-dom'
import classNames from './Header.module.pcss'
import { useTranslation } from 'react-i18next'

export function ComingSoonLinks() {
	const { t } = useTranslation()

	return (
		<div className={classNames.comingSoonContainer}>
			<Link className={classNames.comingSoon} to="#">
				{t('header.earn')}
			</Link>
			<Link className={classNames.comingSoon} to="#">
				{t('header.portfolio')}
			</Link>
			<Link className={classNames.comingSoon} to="#">
				{t('header.myReferrals')}
			</Link>
		</div>
	)
}
