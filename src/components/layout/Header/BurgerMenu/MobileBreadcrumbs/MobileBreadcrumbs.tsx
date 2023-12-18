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
			<Link to={routes.swap} className={classNames.link}>
				<Button variant={'black'} className={`${classNames.listButton} ${matchSwap ? classNames.active : ''}`}>
					<h5>{t('header.swap')}</h5>
				</Button>
			</Link>
			<Link to={routes.earn} className={classNames.link}>
				<Button variant={'black'} className={`${classNames.listButton} ${matchEarn ? classNames.active : ''}`}>
					<h5>{t('header.earn')}</h5>
				</Button>
			</Link>
			<div className={classNames.separator} />
		</ul>
	)
}
