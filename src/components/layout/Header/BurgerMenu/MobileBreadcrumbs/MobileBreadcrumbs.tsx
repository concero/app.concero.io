import classNames from './MobileBreadcrumbs.module.pcss'
import { Button } from '../../../../buttons/Button/Button'
import { useTranslation } from 'react-i18next'
import { Link, useMatch } from 'react-router-dom'
import { routes } from '../../../../../constants/routes'
import { WalletButton } from '../../WalletButton/WalletButton'

export function MobileBreadcrumbs() {
	const { t } = useTranslation()
	const matchSwap = useMatch(routes.swap)
	const matchEarn = useMatch(routes.earn)

	return (
		<ul className={classNames.container}>
			<WalletButton />
			<Link to={routes.rewards} className={classNames.link}>
				<Button
					variant={'tetrary'}
					className={`${classNames.listButton} ${matchEarn ? classNames.active : ''}`}
				>
					<h5>Rewards</h5>
				</Button>
			</Link>
			<Link to={routes.pool} className={classNames.link}>
				<Button
					variant={'tetrary'}
					className={`${classNames.listButton} ${matchEarn ? classNames.active : ''}`}
				>
					<h5>Provide Liquidity</h5>
				</Button>
			</Link>
			<div className={classNames.separator} />
			<a href="https://lanca.io" className={classNames.link}>
				<Button
					variant={'tetrary'}
					className={`${classNames.listButton} ${matchSwap ? classNames.active : ''}`}
				>
					<h5>{t('header.swap')}</h5>
				</Button>
			</a>
			<div className={classNames.separator} />
		</ul>
	)
}
