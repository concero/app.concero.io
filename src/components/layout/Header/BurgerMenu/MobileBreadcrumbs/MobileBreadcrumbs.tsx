import classNames from './MobileBreadcrumbs.module.pcss'
import { Button } from '../../../../buttons/Button/Button'
import { useTranslation } from 'react-i18next'
import { Link, useMatch } from 'react-router-dom'
import { routes } from '../../../../../constants/routes'

export function MobileBreadcrumbs() {
	const { t } = useTranslation()
	const matchExchange = useMatch(routes.exchange)
	const matchStaking = useMatch(routes.staking)

	return (
		<ul className={classNames.container}>
			<Link to={routes.exchange} className={classNames.link}>
				<Button variant={matchExchange ? 'filled' : 'black'} className={classNames.listButton}>
					<h5>{t('header.exchange')}</h5>
				</Button>
			</Link>
			<Link to={routes.staking} className={classNames.link}>
				<Button variant={matchStaking ? 'filled' : 'black'} className={classNames.listButton}>
					<h5>{t('header.staking')}</h5>
				</Button>
			</Link>
			<div className={classNames.separator} />
		</ul>
	)
}
