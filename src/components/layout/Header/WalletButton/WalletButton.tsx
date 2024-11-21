import { useWeb3Modal } from '@web3modal/wagmi/react'
import { action, category } from '../../../../constants/tracking'
import { useAccount } from 'wagmi'
import { Button } from '../../../buttons/Button/Button'
import { truncateWallet } from '../../../../utils/formatting'
import { useTranslation } from 'react-i18next'
import classNames from './WalletButton.module.pcss'
import { trackEvent } from '../../../../hooks/useTracking'
import { IconWallet } from '@tabler/icons-react'

interface Props {
	className?: string
	isFull?: boolean
}

export const WalletButton = ({ className, isFull = false }: Props) => {
	const { address, isConnected, isDisconnected, isConnecting } = useAccount()
	const { open } = useWeb3Modal()
	const { t } = useTranslation()

	function handleClick() {
		void open()
		void trackEvent({
			category: category.Wallet,
			action: action.ClickConnectWallet,
			label: 'Clicked Connect Wallet',
		})
	}

	const getStatus = () => {
		if (isConnected) return truncateWallet(address!)
		if (isConnecting) return t('walletButton.connecting')
		if (isDisconnected) return t('walletButton.connectWallet')
		return t('walletButton.connectWallet')
	}

	return (
		<Button
			isFull={isFull}
			leftIcon={isConnected ? <IconWallet size={16} color="var(--color-grey-600)" /> : null}
			className={`${classNames.buttonWallet} ${className}`}
			variant={isConnected ? 'secondary' : 'primary'}
			onClick={handleClick}
		>
			{getStatus()}
		</Button>
	)
}
