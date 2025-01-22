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
		</ul>
	)
}
