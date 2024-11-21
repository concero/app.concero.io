import classNames from './MobileBreadcrumbs.module.pcss'
import { Button } from '../../../../buttons/Button/Button'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { routes } from '../../../../../constants/routes'
import { WalletButton } from '../../WalletButton/WalletButton'
import { useMediaQuery } from '../../../../../hooks/useMediaQuery'

export function MobileBreadcrumbs() {
	const isMobile = useMediaQuery('mobile')
	const { t } = useTranslation()

	return (
		<ul className={classNames.container}>
			{isMobile && <WalletButton isFull={true} className={classNames.walletButton} />}
			<Link to={routes.rewards} className={classNames.link}>
				<Button variant={'tetrary'} className={classNames.listButton}>
					<h5>Rewards</h5>
				</Button>
			</Link>
			<Link to={routes.pool} className={classNames.link}>
				<Button variant={'tetrary'} className={classNames.listButton}>
					<h5>Provide Liquidity</h5>
				</Button>
			</Link>
			<div className={classNames.separator} />
			<a href="https://lanca.io" className={classNames.link}>
				<Button variant={'tetrary'} className={classNames.listButton}>
					<h5>{t('header.swap')}</h5>
				</Button>
			</a>
		</ul>
	)
}
