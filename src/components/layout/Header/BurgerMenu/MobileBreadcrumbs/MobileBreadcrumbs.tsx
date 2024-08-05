import classNames from './MobileBreadcrumbs.module.pcss'
import { Button } from '../../../../buttons/Button/Button'
import { useTranslation } from 'react-i18next'
import { Link, useMatch } from 'react-router-dom'
import { routes } from '../../../../../constants/routes'

export function MobileBreadcrumbs() {
	const { t } = useTranslation()
	const matchSwap = useMatch(routes.swap)
	const matchEarn = useMatch(routes.earn)

	return (
		<ul className={classNames.container}>
			<a href="https://lanca.io" className={classNames.link}>
				<Button variant={'black'} className={`${classNames.listButton} ${matchSwap ? classNames.active : ''}`}>
					<h5>{t('header.swap')}</h5>
				</Button>
			</a>
			<Link to={routes.pool} className={classNames.link}>
				<Button variant={'black'} className={`${classNames.listButton} ${matchEarn ? classNames.active : ''}`}>
					<h5>Pool</h5>
				</Button>
			</Link>
			<Link to={routes.rewards} className={classNames.link}>
				<Button variant={'black'} className={`${classNames.listButton} ${matchEarn ? classNames.active : ''}`}>
					<h5>Rewards</h5>
				</Button>
			</Link>
			<div className={classNames.separator} />
		</ul>
	)
}
