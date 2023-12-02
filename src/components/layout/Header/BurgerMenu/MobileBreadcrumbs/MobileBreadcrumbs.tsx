import classNames from './MobileBreadcrumbs.module.pcss'
import { Button } from '../../../../buttons/Button/Button'
import { useTranslation } from 'react-i18next'
import { Link, useMatch } from 'react-router-dom'
import { routes } from '../../../../../constants/routes'

export function MobileBreadcrumbs() {
	const { t } = useTranslation()
	const matchExchange = useMatch(routes.swap)
	const matchStaking = useMatch(routes.earn)

	return (
		<ul className={classNames.container}>
			<Link to={routes.swap} className={classNames.link}>
				<Button variant={'black'} className={`${classNames.listButton} ${matchExchange ? classNames.active : ''}`}>
					<h5>{t('header.exchange')}</h5>
				</Button>
			</Link>
			<Link to={routes.earn} className={classNames.link}>
				<Button variant={'black'} className={`${classNames.listButton} ${matchStaking ? classNames.active : ''}`}>
					<h5>{t('header.staking')}</h5>
				</Button>
			</Link>
			<div className={classNames.separator} />
		</ul>
	)
}
