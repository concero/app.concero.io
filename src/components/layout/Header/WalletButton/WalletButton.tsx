import { useWeb3Modal } from '@web3modal/react'
import { type FC } from 'react'
import { action, category } from '../../../../constants/tracking'
import { useAccount } from 'wagmi'
import { IconWallet } from '@tabler/icons-react'
import { Button } from '../../../buttons/Button/Button'
import { truncateWallet } from '../../../../utils/formatting'
import { useTranslation } from 'react-i18next'
import classNames from './WalletButton.module.pcss'
import { trackEvent } from '../../../../hooks/useTracking'

interface WalletButtonProps {}

export const WalletButton: FC<WalletButtonProps> = () => {
	const { address, isConnected, isDisconnected, isConnecting } = useAccount()
	const { open } = useWeb3Modal()
	const { t } = useTranslation()

	function handleClick() {
		open()
		trackEvent({ category: category.Wallet, action: action.ClickConnectWallet, label: 'Clicked Connect Wallet' })
	}

	const getStatus = () => {
		if (isConnected) return truncateWallet(address)
		if (isConnecting) return t('walletButton.connecting')
		if (isDisconnected) return t('walletButton.connectWallet')
		return t('walletButton.connectWallet')
	}

	return (
		<Button
			variant={isConnected ? 'subtle' : 'primary'}
			leftIcon={<IconWallet size={16} color={isConnected ? 'var(--color-grey-500)' : 'var(--color-base-white)'} />}
			size="sm"
			onClick={handleClick}
		>
			<p className={!isConnected ? classNames.buttonText : 'body1'}>{getStatus()}</p>
		</Button>
	)
}
